import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      average {(good-bad)/(good+neutral+bad)} <br></br>
      positive {good/(good+neutral+bad)}
    </>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>
          Good
      </button>
      <button onClick={handleNeutralClick}>
          Neutral
      </button>
      <button onClick={handleBadClick}>
          Bad
      </button>
      <h1>statistics</h1>
      <p>
        good {good} <br></br>
        neutral {neutral} <br></br>
        bad {bad} <br></br>
        all {all} <br></br>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </p>
    </div>
  )
}

export default App