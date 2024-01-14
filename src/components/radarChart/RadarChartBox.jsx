import { useEffect, useState } from "react";
import { getCurrentAirStats } from "../../weatherData";
import "./radarChartBox.scss";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function RadarChartBox({ latitude, longitude }) {
  const [airStats, setAirStats] = useState({});

  useEffect(() => {
    const fetchAirStats = async () => {
      const stats = await getCurrentAirStats(latitude, longitude);
      setAirStats(stats);
    };
    fetchAirStats();
  }, [latitude, longitude]);
  const data = [
    {
      subject: "co/50",
      A: `${airStats.co / 50}`,
      maxValue: 5,
    },
    {
      subject: "no/10",
      A: `${airStats.no / 10}`,
      maxValue: 5,
    },
    {
      subject: "no2/10",
      A: `${airStats.no2 / 10}`,
      maxValue: 5,
    },
    {
      subject: "o3/20",
      A: `${airStats.o3 / 20}`,
      maxValue: 5,
    },
    {
      subject: "so2/10",
      A: `${airStats.so2 / 10}`,
      maxValue: 5,
    },
    {
      subject: "nh3",
      A: `${airStats.nh3}`,
      maxValue: 5,
    },
  ];
console.log(airStats);

  return (
    <div className="radarChart">
      <h3>Air Stats</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis dataKey="maxValue"/>
          <Tooltip 
            
          />
          <Radar
            name="value"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChartBox;
