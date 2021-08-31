import Country from "./Country"

const Countries = ({filter, countries, setNewFilter}) => {
    if (filter === '') {
        return(
            <p>Too many matches, specify another filter</p>
        )
    }
    else {
        const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
        if (countriesToShow.length > 10) {
            return(
                <p>Too many matches, specify another filter</p>
            )
        } else if (1 < countriesToShow.length) {
            return (
            countriesToShow.map(country => 
                <form 
                    key={country.name} 
                    onSubmit={(event) => { 
                        event.preventDefault()
                        setNewFilter(country.name)}}>
                        {country.name} <button type="submit">show</button>
                </form>
            ))
        } else if (countriesToShow.length === 1){
            return(
                <Country country={countriesToShow[0]}></Country>
            )
        } else {
            return(
                <p>No matches.</p>
            )
        }
    }
}

export default Countries