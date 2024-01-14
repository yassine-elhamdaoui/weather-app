import { convertUnixToTimestamp } from '../../weatherData';
import './areaChart.scss'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


function AreaChartBox({hourly}) {
  console.log(hourly);
  const data = hourly.slice(0, 8).map((hourData) => {
    const timestampInfo = convertUnixToTimestamp(hourData.dt);
    return {
      name: `${timestampInfo.hours}AM`,
      temp: `${(hourData.temp).toFixed()}`,
      dew: `${(hourData.dew_point)}`,
      uvi: `${(hourData.uvi)}`,
      yValues: 50,
    };
  });  
  return (
    <div className="areaChart">
      <h3>Overview</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart
          data={data}
        >
          <CartesianGrid strokeDasharray="#f5f5f5" />
          <XAxis
            dataKey="name"
            fontSize={12}
          />
          <YAxis
            dataKey="yValues"
          />
          <Tooltip 
            
          />
          <Area unit="°" type="monotone" dataKey="temp" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="uvi" barSize={20} fill="#413ea0" />
          <Line unit="°" type="monotone" dataKey="dew" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChartBox