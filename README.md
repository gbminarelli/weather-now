# Weather Now

An API and single-page application through which users can fetch the current weather for a specific city.

<p align="center">
  <img src="https://media.giphy.com/media/kmjnmi8Wizt3HqCsT1/giphy.gif" alt="demo" />
</p>

## Getting Started

### Dependencies

- [OpenWeather API](https://openweathermap.org/api)
- [axios](https://www.npmjs.com/package/axios)
- Node.js
- React and ReactDOM

### Installing

1. Grab the repo:

```
git clone https://github.com/gbminarelli/weather-now.git
```

2. Install dependencies:

```
cd weather-now/
npm install
```

**Note**: you can use any package manager that can consume `package.json`.

3. Add API Key:

Create an `api-key.txt` file, place it inside of the `server` folder and copy and paste your own API Key (https://openweathermap.org/appid) inside of said text file. It should be a small string, no spaces or line breaks.

### Executing

1. Boot local server:

```
npm start
```

or:

```
node server/server.js
```

2. Access web interface at `127.0.0.1:3000`.

## Authors

Gianlucci B. Minarelli
[gbminarelli](https://github.com/gbminarelli)
