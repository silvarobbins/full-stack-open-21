import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('' )
  const [ filter, setNewFilter ] = useState('')
   
  useEffect(() => {
    personsService
      .getAll()
      .then(initalPersons => {setPersons(initalPersons)
      })
    }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.map(person => person.name).indexOf(newName) >= 0) {
      const response = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (response)
        update(persons[persons.map(person => person.name).indexOf(newName)].id)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
        }
      setPersons(persons.concat(personObject))

      personsService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }

    setNewName('')
    setNewNumber('')
  }

  const update = id => {
    const person = persons.find(person => person.id === id)
    const newPerson = {...person, number: newNumber}
    personsService
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))})
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
        <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={ handleNumberChange}/> 
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App