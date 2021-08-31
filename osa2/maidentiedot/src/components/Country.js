import Weather from "./Weather"

const Country = ({country}) => {
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
        <Weather country={country}/>
        </div>
    )
}

export default Country