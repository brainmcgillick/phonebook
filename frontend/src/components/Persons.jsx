const Persons = ({persons, deletePerson}) => {  
  return (
      <>
        <h2>Numbers</h2>
        {persons.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
          </div>
        )}
      </>
    )
  }

export default Persons