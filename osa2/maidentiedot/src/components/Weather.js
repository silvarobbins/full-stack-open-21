import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {

    const [weatherData, setWeatherdata] = useState([])


    const hook = () => {
        const weatherParams = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital
        }

        axios
            .get('http://api.weatherstack.com/current', {params: weatherParams})
            .then(response => {
                setWeatherdata(response.data.current)
                console.log(response)
            })
    }

    useEffect(hook, [country.capital])

    return(
        <div>
            <h2>Weather in {country.capital}</h2>
            <p><b>Temperature:</b>{weatherData.temperature} celcius</p>
            <img src={weatherData.weather_icons} alt="weather icon" width="100"></img>
            <p><b>Wind:</b>{weatherData.wind_speed} km/h direction {weatherData.wind_dir}</p>
        </div>
    )
}

export default Weather