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
          <Part part={part}/>
      )}
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
      </div>
    )
  }

const Course = ({ course }) => {
    return (
        <div>
          <Header course={course} />
          <Content course={course}/>
        </div>
      )
}

export default Course