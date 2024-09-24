import { useState } from 'react'

const Statistics = (props) => {
  //console.log('statistics')
  const yht = props.good+props.neutral+props.bad
  if (yht === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value = {props.good} />
      <StatisticLine text="neutral" value = {props.neutral} />
      <StatisticLine text="bad" value = {props.bad} />
      <StatisticLine text="all" value = {yht} />
      <StatisticLine text="average" value = {(props.good-props.bad)/yht} />
      <StatisticLine text="positive" value = {props.good/yht*100 + ' %'} /> 
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: '60px' }}>{props.text}</td>
          <td style={{ width: '200px' }}>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  //console.log('Nappia painettu')
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => setGood(good + 1)}
        text='good'
      />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text='neutral'
      />
      <Button
        handleClick={() => setBad(bad + 1)}
        text='bad'
      />
      <h1>statistics</h1>      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App


