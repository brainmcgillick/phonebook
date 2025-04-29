const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log(`connecting to ${url}`)
mongoose.connect(url)
    .then(result => {
        console.log("connected to MONGODB")
    })
    .catch(error => {
        console.log("could not connect to MONGODB", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (val) => {
                return /^\d{2,3}[-]\d{6,}$/.test(val)
            },
            message: props => `${props.value} is not a valid number`
    }
    }
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)