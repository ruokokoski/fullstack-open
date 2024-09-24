import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, handleRemove }) => {
  return (
    <div>
      <span>{person.name} {person.number}</span>
      <button onClick={() => handleRemove(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, handleRemove }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} handleRemove={handleRemove} />)}
    </div>
  )
}

const Lomake = ({ newName, newNr, handleNewName, handleNewNr, addNew }) => {
  return (
    <form onSubmit={addNew}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNr} onChange={handleNewNr}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter} />
    </div>
  )
}

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}




const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNr, setNewNr] = useState('')
  const [filter, setFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const addNew = (event) => {
    event.preventDefault()
    // console.log('nappia painettu', event.target)
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
    const personObject = {
      name: newName,
      number: newNr,
      id: maxId + 1 //persons.length + 1,
    }
    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updated = { ...nameExists, number: newNr }
        personService
          .update(nameExists.id, updated)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : returnedPerson))
            setNewName('')
            setNewNr('')
            setNotifMessage(`Updated ${newName}'s number`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${nameExists.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(person => person.id !== nameExists.id))
          })
      }
      return
    }
    console.log('id', personObject.id)
    personService
      .getAll()
      .then(allPersons => {
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(allPersons.concat(returnedPerson))
            setNewName('');
            setNewNr('');
            setNotifMessage(`Added ${newName}`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 3000)
          })
      })
    
  }
  
  const handleNewName = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNr = (event) => {
    setNewNr(event.target.value)
  }

  const handleRemove = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotifMessage(`Deleted ${persons.find(person => person.id === id).name}`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 3000)
        })
    }
  }

  const suodatus = filter === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={success} message={notifMessage} />
      <Notification style={error} message={errorMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <Lomake newName={newName} newNr={newNr} handleNewName={handleNewName} handleNewNr={handleNewNr} addNew={addNew} />
      <h3>Numbers</h3>
      <Persons persons={suodatus} handleRemove={handleRemove}/>
    </div>
  )

}

export default App
