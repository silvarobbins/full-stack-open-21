import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
      {props.course.parts.map(part =>
          <Part key={part.id} part={part}/>
      )}
      </div>
    )
  }
  
  const Total = (props) => {
    var tot = 0
    props.course.parts.map(part =>
      tot += part.exercises
    )
    return (
      <div>
        <b>Number of exercises {tot}</b>
      </div>
    )
  }

const Course = ({ course }) => {
    return (
        <div>
          <Header course={course} />
          <Content course={course}/>
          <Total course={course} />
        </div>
      )
}

export default Course