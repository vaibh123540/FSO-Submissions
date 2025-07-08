import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Success from './components/Success'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Error from './components/Error'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    numberService
      .getAll()
      .then(persons => setPersons(persons))
  },[])

  const addNewName = (e) => {
    e.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (confirm(`${newName} is already added to the Phonebook, replace the old number with a new one?`)) {
        numberService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(response => {
            setPersons(persons.map(p => p.name === newName ? response.data : p))
            setSuccessMessage(`Updated phone number of ${newName}`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => setSuccessMessage(null), 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
            setPersons(persons.filter(person => person.id!==existingPerson.id))
          })
      }
    }

    else {
      const newPerson = {name: newName, number: newNumber}
      numberService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setSuccessMessage(`Added ${newName}`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => setSuccessMessage(null), 5000)
        })
    }
  }

  const handleDelete = person => {
    const id = person.id
    if (confirm(`Delete ${person.name}`)) {
      numberService
        .erase(id)
        .then(setPersons(persons.filter(name => name.id !== id)))
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNewFilter = (e) => {
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Success successMessage={successMessage}/>
      <Error errorMessage={errorMessage} />
      <Filter filter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons newFilter = {newFilter} persons = {persons} handleDelete = {handleDelete}/>
    </div>
  )
}

export default App