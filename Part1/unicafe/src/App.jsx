import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = (good - bad)/all
  const percPos = (good/all)*100

  if (all === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticLine text = "Good" value = {good} />
        <StatisticLine text = "Neutral" value = {neutral} />
        <StatisticLine text = "Bad" value = {bad} />
        <StatisticLine text = "All" value = {all} />
        <StatisticLine text = "Average" value = {average} />
        <StatisticLine text = "Positive" value = {percPos + " %"} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusGood = () => {
    console.log("New good:", good + 1)
    setGood(good + 1)
  }

  const plusNeutral = () => {
    console.log("New neutral:", neutral + 1)
    setNeutral(neutral + 1)
  }
  const plusBad = () => {
    console.log("New bad:", bad + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={plusGood} text = "good" />
      <Button onClick={plusNeutral} text = "neutral" /> 
      <Button onClick={plusBad} text = "bad" />
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} neutral = {neutral} />
    </div>
  )
}

export default App