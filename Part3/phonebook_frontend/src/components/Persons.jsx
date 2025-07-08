const Persons = (props) => {
  const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
  return (
    <div>
    {filtered.map(person => {
      return (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person)}>Delete</button>
        </div>
      )
    })}
    </div>
  )
}

export default Persons