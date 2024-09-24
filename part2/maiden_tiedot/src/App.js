import { useState, useEffect } from 'react'
import axios from 'axios'

const Etsi = ({filter, setFilter, countries}) => {
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const suodatetut = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  const [selCountry, setSelCountry] = useState(null)

  const handleCountry = (country) => {
    setSelCountry(country)
  }

  useEffect(() => {
    setSelCountry(null)
  }, [filter])
  
  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      {suodatetut.length > 10 
        ? (<p>Too many matches, specify another filter</p>)
        : suodatetut.length === 1 ? (<Maa country={suodatetut[0]} />) 

        : (suodatetut.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}{' '}
              <button onClick={() => handleCountry(country)}>
                Show
              </button>
            </p>
          </div>
          ))
      )}
      {selCountry && <Maa country={selCountry} />}
    </div>
  )
}

const Maa =({country}) => {
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('haetaan sää...')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        console.error('Virhe säätietojen haussa:', error)
        setWeather(null)
      })
  }, [country.capital])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}`} width="200" />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {(weather.main.temp-273.15).toFixed(2)} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} style={{ width: '100px', height: '100px' }}/>
          <p>wind {weather.wind.speed.toFixed(2)} m/s</p>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('haetaan maat...')
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Etsi filter={filter} setFilter={setFilter} countries={countries} />
    </div>
  )
}

export default App
