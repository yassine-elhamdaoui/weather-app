import AreaChartBox from '../../components/areaChart/AreaChartBox';
import RadarChartBox from '../../components/radarChart/RadarChartBox';
import TodayBoxes from '../../components/today_boxes/TodayBoxes'
import TodayInfos from '../../components/today_infos/TodayInfos';
import './today.scss'

function Today({weatherData , location}) {

  return (
    <div className="today">
      <div className="today-left-section">
        <div className="left-section-header">
          <h3>Today overview</h3>
          <p>More detail</p>
        </div>
        {weatherData && <TodayBoxes current={weatherData.current} />}
        <div className="today-charts">
          {weatherData && <AreaChartBox hourly={weatherData.hourly}/>}
          {weatherData && <RadarChartBox latitude={weatherData.latitude} longitude={weatherData.longitude}/>}
        </div>
      </div>
      <div className="today-right-section">
        {weatherData && <TodayInfos weatherData={weatherData} location={location}/>}
      </div>
    </div>
  );
}

export default Today