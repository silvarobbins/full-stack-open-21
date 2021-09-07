const Persons = ({ personsToShow, deletePerson}) => {
    return (
    personsToShow.map(person => 
        <form 
            key={person.name} 
            onSubmit={(event) => {
                event.preventDefault()
                deletePerson(person.id)}}>
                {person.name} {person.number}<button type="submit">delete</button>
        </form>
        )
    )}

export default Persons