import './todayBoxes.scss'
import { BsWind, BsDroplet, BsEye } from "react-icons/bs";
import { MdCompress } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";


function TodayBoxes({current}) {
    console.log(current);
    const data = [
      {
        name: "Wind Speed",
        value: `${current.wind_speed}m/s`,
        icon: <BsWind />,
        description: "its pretty windy",
      },
      {
        name: "Humidity",
        value: `${current.humidity}%`,
        icon: <BsDroplet />,
        description: `the dew point is ${current.dew_point}° now`,
      },
      {
        name: "Pressure",
        value: `${current.pressure}hPa`,
        icon: <MdCompress />,
        description: "average pressure",
      },
      {
        name: "Feels Like",
        value: `${current.feels_like.toFixed()}°`,
        icon: <CiTempHigh />,
        description: "humidity is making it feel hotter",
      },
    ];
  return (
    <div className="today-boxes">
      {data.map((info) => (
        <div key={info.name} className="box">
          <h2>{info.icon}</h2>
          <div className="infos">
            <p>{info.name}</p>
            <div className="more-stuff">
              <h1>{info.value}</h1>
              <h6>{info.description}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodayBoxes