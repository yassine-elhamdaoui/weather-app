const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const API_KEY2 = "8738bfd1e69e7d2a92b04ed36eea8fa7";

async function getWeatherDataByLocation() {
  try {
    // Get user's coordinates using geolocation
    if ("geolocation" in navigator) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      // Get city name and country based on coordinates
      // const coordinatesData = await getCurrentCoordinates(latitude, longitude);

      // Fetch weather data using coordinates
      const weatherData = await getWeatherData(latitude, longitude);

      return {
        ...weatherData,
        // city: coordinatesData.name,
        // country: coordinatesData.country,
      };
    } else {
      console.log("Geolocation is not available in this browser.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather data by location:", error);
    return null;
  }
}
// const getCurrentCoordinates = async (latitude,longitude) => {
//   const URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
//     const data = await fetch(URL)
//     .then((res) => res.json())
//     .then((data) => data);
//   const {
//       name , country
//   } = data[0];

//   return {
//     country,
//     name,
//   };
// }

const getOtherCitiesData = async (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY2}&units=metric`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
  const {
    weather,
    main: { temp },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];
  return {
    description,
    icon,
    temp,
    country,
    name,
  };
};
const getCurrentAirStats = async (latitude, longitude) => {
  const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY2}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data.list[0].components);
  const { co, no, no2, o3, so2, nh3 } = data;

  return {
    co,
    no,
    no2,
    o3,
    so2,
    nh3,
  };
};

const getCoordinates = async (city) => {
  if (!city) {
    return { lat: null, lon: null, name: null, country: null };
  }

  const URL_COOR = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
  const data = await fetch(URL_COOR)
    .then((res) => res.json())
    .then((data) => data[0] || {}); // Use an empty object if data is undefined

  const { lat, lon, name, country } = data;
  return {
    lat,
    lon,
    name,
    country,
  };
};

const getWeatherData = async (lat, lon) => {
  const URL_DATA = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric`;
  const data = await fetch(URL_DATA)
    .then((res) => res.json())
    .then((data) => data);
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;
  const latitude = data.lat;
  const longitude = data.lon;
  return {
    current,
    hourly,
    daily,
    latitude,
    longitude,
  };
};

function convertUnixToTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Get the name of the day
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    dayOfWeek,
  };
}

export {
  getWeatherDataByLocation,
  getCurrentAirStats,
  getCoordinates,
  getWeatherData,
  getOtherCitiesData,
  convertUnixToTimestamp,
};
