import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
          Good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
          Neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
          Bad
      </button>
      <h1>statistics</h1>
      <body>good {good}</body>
      <body>neutral {neutral}</body>
      <body>bad {bad}</body>
    </div>
  )
}

export default App