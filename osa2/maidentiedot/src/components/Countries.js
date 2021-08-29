const Countries = ({filter, countries}) => {
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
                <li key={country.name}>{country.name}</li>
            ))
        } else {
            const country = countriesToShow[0]
            return(
                <div>
                <h1>{country.name}</h1>
                    <p>Capital: {country.capital} <br/>
                    Population: {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => 
                        <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={country.flag} alt="flag" width="170"></img>
                </div>
            )
        }
    }
}

export default Countries