import { useEffect, useState } from 'react'
import axios from 'axios'
import Result from './components/Result'
import Info from './components/Info'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [dataShown, setDataShown] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  const filteredCountries = countries.filter(c => c.toLowerCase().includes(country.toLowerCase()))

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data.map(c => c.name.common)))
  }, [])

  useEffect(() => {
    setDataShown(null)
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response => setDataShown(response.data))
      axios
        .get(`http://api.weatherapi.com/v1/current.json`,{
          params: {
            key: api_key,
            q: filteredCountries[0]
          }
        })
        .then(response => setWeather(response.data))
    }
  }, [country])

  const handleSearch = (e) => {
    setCountry(e.target.value)
  }

  return (
    <div>
      find countries <input value={country} onChange={handleSearch}/>
      <Result filteredCountries={filteredCountries} setCountry={setCountry} />
      <Info filteredCountries={filteredCountries} dataShown={dataShown} weather={weather} />
    </div>
  )
}

export default App
