import { convertUnixToTimestamp } from '../../weatherData';
import HourlyRainChart from '../hourly_rain_chart/HourlyRainChart';
import { TbSunset2, TbSunHigh } from "react-icons/tb";
import './todayInfos.scss'

function TodayInfos({weatherData , location}) {
  console.log(weatherData);
  const timeSunset =
    convertUnixToTimestamp(weatherData.current.sunset).hours -
    convertUnixToTimestamp(weatherData.current.dt).hours;
  const timeSunrise =
    convertUnixToTimestamp(weatherData.current.dt).hours -
    convertUnixToTimestamp(weatherData.current.sunrise).hours;
  
  return (
    <div className="today-infos">
      <div className="today-infos-top">
        <div className="top-right">
          <h3>Weatherly</h3>
          <h6>
            {location
              ? `${location.name},${location.country}`
              : "your location"}
          </h6>
        </div>
        <h2 className="time">
          {convertUnixToTimestamp(weatherData.current.dt).hours}:
          {convertUnixToTimestamp(weatherData.current.dt).minutes}
        </h2>
      </div>
      <div className="today-infos-middle">
        <div className="middle-temperature">
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt=""
            />
            <h1>{weatherData.current.temp.toFixed()}°</h1>
          </div>
          <h3>{weatherData.current.weather[0].description}</h3>
        </div>
        <div className="today-rain-infos">
          <HourlyRainChart weatherData={weatherData} />
        </div>
        <div className="sun">
          <h3>Sunrise & Sunset</h3>
          <div className="sunrise">
            <TbSunHigh size={"1.7rem"} style={{ marginLeft: "3px" }} />
            <div className="sun-infos">
              <div className="data">
                <p>Sunrise</p>
                <h2>
                  {convertUnixToTimestamp(weatherData.current.sunrise).hours}:
                  {convertUnixToTimestamp(weatherData.current.sunrise).minutes}
                </h2>
              </div>
              <div className="offset">
                <h5>
                  {timeSunrise >= 0
                    ? timeSunrise + " hours ago"
                    : "in "+timeSunrise + " hours"}
                </h5>
              </div>
            </div>
          </div>
          <div className="sunset">
            <TbSunset2 size={"1.7rem"} style={{ marginLeft: "3px" }} />
            <div className="sun-infos">
              <div className="data">
                <p>Sunset</p>
                <h2>
                  {convertUnixToTimestamp(weatherData.current.sunset).hours}:
                  {convertUnixToTimestamp(weatherData.current.sunset).minutes}
                </h2>
              </div>
              <div className="offset">
                <h5>
                  {timeSunset <= 0
                    ? timeSunset + " hours ago"
                    : "in "+timeSunset + " hours"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayInfos