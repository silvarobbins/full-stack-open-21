import React from 'react'

const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return(
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
      {parts.map(part =>
          <Part key={part.id} part={part}/>
      )}
      </div>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((tot, part) => tot + part.exercises, 0)
    return (
      <div>
        <b>Number of exercises {total}</b>
      </div>
    )
  }

const Course = ({ course }) => {
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts}/>
          <Total course={course} />
        </div>
      )
}

export default Course