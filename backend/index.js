const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(express.static("dist"))

morgan.token("body", (req) => {
    return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send("Person Not Found")
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id

    if (!persons.find(person => person.id === id)) {
        persons = persons.filter(person => person.id !== id)
        res.status(200).send()
    } else {
        res.status(400).send()
    }
})

app.post("/api/persons", (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.statusMessage = "Missing data in request"
        return res.status(400).send()
    }

    const checkName = persons.find(person => person.name === body.name)

    if (checkName) {
        res.statusMessage = "Name already exists"
        return res.status(400).send()
    }

    const id = Math.floor(Math.random() * 10000)
    const person = {...body, "id": `${id}`}
    persons = persons.concat(person)
    res.status(201).json(person)
})

app.get("/api/info", (req, res) => {
    const entries = persons.length
    const time = new Date
    res.send(`Phonebook has info for ${entries} people<br>${time}`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`application is running on port ${PORT}`)
})