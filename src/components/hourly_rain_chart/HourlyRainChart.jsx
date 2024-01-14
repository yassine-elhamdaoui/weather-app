import { convertUnixToTimestamp } from '../../weatherData';
import './hourlyRainChart.scss'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function HourlyRainChart({weatherData}) {
      const data = weatherData.hourly.slice(0, 4).map((hourData) => {
        const timestampInfo = convertUnixToTimestamp(hourData.dt);
        return {
          name: `${timestampInfo.hours}AM`,
          rain: `${(hourData.pop * 100).toFixed()}`,
          amt: 100,
        };
      });
      console.log(data);
      
  return (
    <div className="hour-rain">
      <h3>Chance of rain</h3>
      <ResponsiveContainer width="99%" height="100%">
        <BarChart data={data} barSize={20}>
          <XAxis
            dataKey="name"
            scale="point"
            fontSize={10}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis style={{ display: "none" }} dataKey="amt" fontSize={10} />
          <Text></Text>
          <Bar
            dataKey="rain"
            unit="%"
            fill="#8884d8"
            background={{ fill: "rgba(255,255,255,0.2)", radius: 10 }}
            radius={10}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="percentage">
        {data.map((hour , index) => (
          <strong key={index}>{hour.rain}%</strong>
        ))}
      </div>

    </div>
  );
}

export default HourlyRainChart