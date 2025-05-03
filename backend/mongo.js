const mongoose = require('mongoose')

if (process.argv.length === 3){
  console.log('test')
  const password = process.argv[2]

  const url = `mongodb+srv://brianmcgillick:${password}@cluster0.87meznc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length < 5){
  console.log('give password, name and number as arguments')
  process.exit(1)
} else {
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url = `mongodb+srv://brianmcgillick:${password}@cluster0.87meznc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery', false)

  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    'name': name,
    'number': number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}