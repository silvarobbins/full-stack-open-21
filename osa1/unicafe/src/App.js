import React, { useState } from 'react'

const Button = ({text, click}) => {
  return (
    <button onClick={click}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
    </tbody>
  )
}

const Statistics = ({ good, neutral, bad, all}) => {
  if (all===0){
    return (
      <div>
        No feedback given
      </div> 
    )
  }
  return (
    <table>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={(good-bad)/(good+neutral+bad)} />
      <StatisticLine text="positive" value ={good/(good+neutral+bad)*100 + "%"} />
    </table>
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
      <Button text="Good" click={handleGoodClick}/>
      <Button text="Neutral" click={handleNeutralClick}/>
      <Button text="Bad" click={handleBadClick}/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>
    </div>
  )
}

export default App