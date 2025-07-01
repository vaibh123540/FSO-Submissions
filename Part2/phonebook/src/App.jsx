import { useState } from 'react'

const Persons = (props) => {
  if (props.newFilter === '') {
    return (
      <div>
        {props.persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
      </div>
    )
  }
  const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
  return (
    <div>
    {filtered.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with<input value={props.filter} onChange={props.handleNewFilter}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNewName = (e) => {
    e.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
    setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
    setNewName('')
    setNewNumber('')
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
      <Filter filter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>add a new</h2>
      <PersonForm addNewName={addNewName} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons newFilter = {newFilter} persons = {persons} />
    </div>
  )
}

export default App