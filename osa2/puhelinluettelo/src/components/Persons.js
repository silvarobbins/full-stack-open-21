import personsService from "../services/persons"

const Persons = ({personsToShow}) => {
    return (
    personsToShow.map(person => 
        <form 
            key={person.id} 
            onSubmit={(event) => {personsService.del(person.id)}}>
                {person.name} {person.number}<button type="submit">delete</button>
        </form>
        )
    )}

export default Persons