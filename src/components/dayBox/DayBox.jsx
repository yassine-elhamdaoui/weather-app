import { convertUnixToTimestamp } from '../../weatherData';
import './dayBox.scss'


function DayBox({isClicked , day , index ,current}) {
    // const test = 1691850290;
    // const test2 = 1691848800;
    // const test3 = 1691852400;
    // const test4 = 1691856000;
  const currentTimeStamp = convertUnixToTimestamp(current.dt)
  const timestampObject = convertUnixToTimestamp(day.dt);
  const sunRise = convertUnixToTimestamp(day.sunrise);
  const sunSet = convertUnixToTimestamp(day.sunset);
  return (
    <>
      {isClicked ? (
        <>
          <div className="dayBox">
            <div className="top">
              <h3>{timestampObject.dayOfWeek}</h3>
              <h4>{index === 0 ? `${currentTimeStamp.hours}:${currentTimeStamp.minutes}` : `${timestampObject.hours}:${timestampObject.minutes}`} AM</h4>
            </div>
            <div className="body">
              <div className="left">
                <h2>{day.temp.day.toFixed()}°</h2>
                <div className="more-info">
                  <h6>
                    Real Feel <span>{day.feels_like.day.toFixed()}°</span>
                  </h6>
                  <h6>
                    Wind <span>{day.wind_speed}m/s</span>
                  </h6>
                  <h6>
                    Pressure <span>{day.pressure}hPa</span>
                  </h6>
                  <h6>
                    Humidity <span>{day.humidity}%</span>
                  </h6>
                </div>
              </div>
              <div className="right">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt=""
                  style={{ width: "90px" }}
                />
                <h6>
                  Sunrise:{" "}
                  <span>
                    {sunRise.hours}:{sunRise.minutes} AM
                  </span>
                </h6>
                <h6>
                  Sunset:
                  <span>
                    {sunSet.hours}:{sunSet.minutes} AM
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="short-wrapper">
          <div className="top-short">
            <h3>{timestampObject.dayOfWeek.substring(0, 3)}</h3>
          </div>
          <div className="body-short">
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt=""
              style={{ width: "90px" }}
            />
            <h2>{day.temp.day.toFixed()}°</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default DayBox