import React, { useEffect, useState } from "react";
import DayBox from "../../components/dayBox/DayBox";
import "./nextWeek.scss";
import RainChart from "../../components/rainChart/RainChart";
import ComposedChart from "../../components/composedChart/ComposedChart";
import OtherLargeCities from "../../components/otherCities/OtherLargeCities";
import { getOtherCitiesData } from "../../weatherData";

const large_cities = [
  {name : 'Tokyo'},
  {name : 'New York'},
  {name : 'Shanghai'},
  {name : 'Mumbai'}, 
  {name : 'Sao Paulo'}, 
  {name : 'Istanbul'},
  {name : 'Moscow'}, 
  {name : 'Beijing'},
  {name : 'Mexico City'},
  {name : 'Cairo'},
]
function NextWeek({ weatherData }) {
  const [clickedDayIndex, setClickedDayIndex] = useState(0);
  const [otherCitiesData, setOtherCitiesData] = useState([]);
  const handleClick = (index) => {
    setClickedDayIndex(index);
  };


  useEffect(() => {
    large_cities.forEach(async (city) => {
      const data = await getOtherCitiesData(city.name);
      setOtherCitiesData((prev) => [...prev, data]);
      console.log("request made");

    });
  }, []); 

  return (
    <div className="holder">
      <div className="nextWeek">
        <div className="days-container">
          {weatherData &&
            weatherData.daily.slice(1, 8).map((day, index) => (
              <div
                key={index}
                className={`day-box ${
                  clickedDayIndex === index ? "active" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                <DayBox
                  day={day}
                  current={weatherData.current}
                  index={index}
                  isClicked={clickedDayIndex === index}
                />
              </div>
            ))}
        </div>

        <div className="rain-chart">
          <h3>Chance of rain</h3>
          {weatherData && <RainChart weatherData={weatherData} />}
        </div>
      </div>
      <div className="more-infos">
        <div className="composedChartBox">
          <div className="top-section">
            <h3>Overview</h3>
            <div className="right-section"></div>
          </div>
          {weatherData && <ComposedChart weatherData={weatherData} />}
        </div>
        <div className="other-large-cities">
          {otherCitiesData &&
            otherCitiesData.map((city) => (
              <OtherLargeCities
                key={city.name}
                description={city.description}
                icon={city.icon}
                temp={city.temp}
                country={city.country}
                cityName={city.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default NextWeek;
