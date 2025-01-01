const Config = {
  api: {
    key: '1c7f606a5e3540eb8dd191642242712',
    baseUrl: 'https://api.weatherapi.com/v1/',
    getCurrentWeather: 'current.json?key={?}&q={?}',
    searchLocation: 'search.json?key={?}&q={?}',
    getForecast: 'forecast.json?key={?}&days={?}&q={?}',
  },
};

export { Config };
