import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Message from './components/Message'
import bookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  
  const hook = () => {
    bookService.getAll()
      .then(people => setPersons(people))
  }

  useEffect(hook, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      bookService.deletePerson(id)
        .then(response => {
          setMessageType("success")
          setMessage(`${name} has been deleted!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessageType("failure")
          setMessage(`${name} has already been deleted!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const [filterName, setFilterName] = useState("")

  const displayNames = filterName === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />
      <Message message={message} messageType={messageType} />
      <Persons persons={displayNames} deletePerson={deletePerson} />
    </div>
  )
}

export default App
