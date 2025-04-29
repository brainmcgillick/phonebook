require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()
app.use(express.json())
app.use(express.static("dist"))

morgan.token("body", (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/api/persons", (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(deletedNote => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body
    
    if (!body.name || !body.number) {
        return next({ name: "MissingData", message: "missing name or number"})
    }

    person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.put("/api/persons/:id", (req, res, next) => {
    const updatedPerson = req.body
    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                return res.status(404).end()
            }

            person.number = updatedPerson.number

            person.save().then(savedPerson => {
                return res.json(savedPerson)
            })
        })
        .catch(error => next(error))
})

app.get("/api/info", (req, res) => {
    Person.find({}).then(result => {
        const entries = result.length
        const time = new Date
        res.send(`Phonebook has info for ${entries} people<br>${time}`)
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.name)
    console.error(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformed id"})
    } else if (error.name === "MissingData") {
        return res.status(400).send(error)
    }
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`application is running on port ${PORT}`)
})