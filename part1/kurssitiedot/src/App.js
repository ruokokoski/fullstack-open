const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  const osat = props.parts
  return (
    <div>
      <Part name={osat[0].name} exercises={osat[0].exercises} />
      <Part name={osat[1].name} exercises={osat[1].exercises} />
      <Part name={osat[2].name} exercises={osat[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  const summa = props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises
  return (
    <div>
      <p>Number of exercises {summa}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )  
}

export default App