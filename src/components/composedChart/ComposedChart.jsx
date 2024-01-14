import { convertUnixToTimestamp } from "../../weatherData";
import "./composedChart.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AreaChartDiv({ weatherData }) {
  
  const dataKeys = ["day", "night", "uvi"];
  const data = weatherData.daily.slice(1,8).map((dayData) => {
    const timestampInfo = convertUnixToTimestamp(dayData.dt);
    const dataObject = {
      name: timestampInfo.dayOfWeek.slice(0,3),
    };

    dataKeys.forEach((key) => {
      dataObject[key] = dayData.temp[key] || dayData[key];
    });

    dataObject.line1 = 60;
    dataObject.line2 = 12;

    return dataObject;
  });
  console.log(data);
  return (
    <div className="composedChart">
      <ResponsiveContainer width="105%" height="100%">
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" dataKey="line1" />
          <YAxis yAxisId="right" dataKey="line2" orientation="right" />
          <Tooltip />
          {dataKeys.map((key, index) => (
            <Line
              key={index}
              yAxisId={key === "uvi" ? "right" : "left"}
              type="monotone"
              dataKey={key}
              stroke={
                key === "day"
                  ? "#8884d8"
                  : key === "uvi"
                  ? "#82ca9d"
                  : "lightblue"
              }
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartDiv;
