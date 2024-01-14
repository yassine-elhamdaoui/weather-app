import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Today from "./pages/today/Today";
import Tomorrow from "./pages/tomorrow/Tomorrow";
import NextWeek from "./pages/next-week/NextWeek";
import { getWeatherDataByLocation } from "./weatherData";
import Loader from "./components/loader/Loader";
import Layout from "./components/layout/Layout";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState();
  const setLocationParam = (newState) => {
    setLocation(newState);
  };
  const setWeatherDataParam = (newState) => {
    setWeatherData(newState);
  };

  useEffect(() => {
    async function fetchWeatherData() {
      const locationData = await getWeatherDataByLocation();
      setWeatherData(locationData);
      // setLocation(locationData.city,locationData.country)
    }
    fetchWeatherData();
  }, []);

  return (
    <div className="app">
      <NavBar
        weatherData={weatherData}
        setWeatherDataParam={setWeatherDataParam}
        location={location}
        setLocationParam={setLocationParam}
      />
      {weatherData ? (
        <div className="main">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <Today weatherData={weatherData} location={location} />
                  }
                />
                <Route path="tomorrow" element={<Tomorrow />} />
                <Route
                  path="next-week"
                  element={<NextWeek weatherData={weatherData} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
