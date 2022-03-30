import { CoursePart } from "../types"

export const Part = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case "normal": 
      return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        <i>{part.description}</i>
      </p>)
    case "groupProject": 
      return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        Project exercises: {part.groupProjectCount} 
      </p>)
    case "submission": 
      return (
      <p>
        <b>{part.name} {part.exerciseCount}</b><br/>
        <i>{part.description}</i><br/>
        Submit to: {part.exerciseSubmissionLink}
      </p>)
    case "special": 
    return (
    <p>
      <b>{part.name} {part.exerciseCount}</b><br/>
      <i>{part.description}</i><br/>
      Required skills: {part.requirements.join(', ')}
    </p>)
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(part)}`
      );
  }
 
}