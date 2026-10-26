# Weather App

A responsive weather app built with React and Vite. Search for a city to see its current temperature, humidity, wind speed, and weather condition. The interface keeps a compact weather-card layout, with animated weather icons and a deep blue page background.

Weather data is provided by the [OpenWeather Current Weather API](https://openweathermap.org/current).

## Features

- Search current weather by city
- Display temperature in Celsius, humidity, wind speed, and weather condition
- Show an animated icon for the current weather
- Responsive layout for mobile and desktop
- Respect reduced-motion accessibility preferences
- Show helpful errors for invalid cities and unavailable weather data

## Preview

Run the app locally using the instructions below to preview it in your browser.

## Requirements

- Node.js (LTS recommended)
- npm
- An OpenWeather API key

## Getting started

1. Clone the repository and move into the project directory:

   ```sh
   git clone <your-repository-url>
   cd Weather-App
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env.local` file in the project root and add your OpenWeather API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   ```

   Get an API key from [OpenWeather](https://home.openweathermap.org/api_keys). Do not commit `.env.local` or publish your key.

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the local URL printed by Vite in your browser. The app loads Bengaluru weather on startup; enter another city in the search field to look it up.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build in `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

Build the app with `npm run build` and deploy the generated `dist` directory to a static hosting provider.

Configure `VITE_OPENWEATHER_API_KEY` in the host's build-time environment variables before building or deploying. Vite embeds `VITE_` variables in client-side code, so this key is visible to users. Use a key intended for browser use and apply any restrictions supported by your OpenWeather account.

## Built with

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [OpenWeather Current Weather API](https://openweathermap.org/current)
