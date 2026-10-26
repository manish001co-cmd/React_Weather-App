import { useEffect, useState } from 'react'
import './App.css'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY?.trim()

const weatherIcons = {
  Clouds: ['bi-clouds', 'cloud'],
  Clear: ['bi-brightness-high', 'sun'],
  Rain: ['bi-cloud-rain', 'rain'],
  Drizzle: ['bi-cloud-drizzle', 'rain'],
  Mist: ['bi-cloud-fog', 'mist'],
  Smoke: ['bi-cloud-fog', 'mist'],
  Haze: ['bi-cloud-fog', 'mist'],
  Dust: ['bi-cloud-fog', 'mist'],
  Fog: ['bi-cloud-fog', 'mist'],
  Sand: ['bi-cloud-fog', 'mist'],
  Ash: ['bi-cloud-fog', 'mist'],
  Squall: ['bi-wind', 'wind'],
  Tornado: ['bi-tornado', 'wind'],
  Snow: ['bi-snow', 'snow'],
  Thunderstorm: ['bi-cloud-lightning-rain', 'storm'],
}

async function getWeather(city) {
  const query = new URLSearchParams({
    q: city,
    units: 'metric',
    appid: apiKey,
  })
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}`,
  )

  if (response.status === 404) {
    throw new Error('Invalid city name')
  }

  if (!response.ok) {
    throw new Error('Unable to get weather data')
  }

  const data = await response.json()
  const condition = data.weather?.[0]?.main

  if (
    !data.name ||
    !Number.isFinite(data.main?.temp) ||
    !Number.isFinite(data.main?.humidity) ||
    !Number.isFinite(data.wind?.speed) ||
    !condition
  ) {
    throw new Error('Weather data is incomplete')
  }

  const [icon, animation] = weatherIcons[condition] ?? ['bi-cloud', 'cloud']

  return {
    city: data.name,
    temperature: `${Math.round(data.main.temp)}°C`,
    humidity: `${data.main.humidity}%`,
    wind: `${data.wind.speed} m/s`,
    icon,
    animation,
  }
}

function getErrorMessage(requestError) {
  console.error('Unable to retrieve weather data:', requestError)

  if (
    requestError instanceof Error &&
    requestError.message !== 'Failed to fetch'
  ) {
    return requestError.message
  }

  return 'Unable to connect to weather service'
}

function App() {
  const [cityInput, setCityInput] = useState('')
  const [weather, setWeather] = useState({
    city: 'City Name',
    temperature: '20°C',
    humidity: '50%',
    wind: '50 m/s',
    icon: 'bi-cloud-drizzle',
    animation: 'rain',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (apiKey) {
      void getWeather('Bangalore')
        .then(setWeather)
        .catch((requestError) => setError(getErrorMessage(requestError)))
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const city = cityInput.trim()

    if (!city) {
      setError('Please enter a city name')
      return
    }

    if (!apiKey) {
      setError('Weather API key is not configured.')
      return
    }

    setLoading(true)
    setError('')
    void getWeather(city)
      .then(setWeather)
      .catch((requestError) => setError(getErrorMessage(requestError)))
      .finally(() => setLoading(false))
  }

  return (
    <div className="card">
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          spellCheck="false"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
          aria-label="City name"
        />
        <button type="submit" aria-label="Search weather" disabled={loading}>
          <i className="bi bi-search" aria-hidden="true"></i>
        </button>
        <p className={`error-message${error ? ' is-visible' : ''}`} role="alert">
          {error}
        </p>
      </form>

      <div className="weather" aria-busy={loading}>
        <i
          className={`bi ${weather.icon} weather-icon weather-icon--${weather.animation}`}
          aria-hidden="true"
        ></i>
        <h1 className="temp">{weather.temperature}</h1>
        <h2 className="city">{weather.city}</h2>

        <div className="details">
          <div className="col">
            <i className="bi bi-water" aria-hidden="true"></i>
            <div>
              <p className="humidity">{weather.humidity}</p>
              <p>Humidity</p>
            </div>
          </div>

          <div className="col">
            <i className="bi bi-wind" aria-hidden="true"></i>
            <div>
              <p className="wind">{weather.wind}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
