import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
    
  return (
    <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
        <Countries filter={filter} countries={countries}/>
    </div>
  );
}

export default App;

