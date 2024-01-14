import { convertUnixToTimestamp } from "../../weatherData";
import "./rainChart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RainChart({ weatherData }) {
  const data = weatherData.daily.slice(1,8).map((dayData) => {
    const timestampInfo = convertUnixToTimestamp(dayData.dt);
    return {
      name: `${timestampInfo.dayOfWeek.slice(0, 3)}`,
      rain: `${(dayData.pop * 100).toFixed()}`,
      amt: 100,
    };
  });
console.log(data);
  return (
    <div className="rainChart">
      <ResponsiveContainer width="99%" height="100%">
        <BarChart
          data={data}
          barSize={9}
          
        >
          <XAxis
            dataKey="name"
            scale="point"
            fontSize={10}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis dataKey="amt" fontSize={10} />
          <Tooltip labelStyle={{ color: "lightblue" }} />
          <Bar dataKey="rain" unit="%" fill="#8884d8" 
             radius={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RainChart;
