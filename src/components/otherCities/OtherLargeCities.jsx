import './otherLargeCities.scss';

function OtherLargeCities({description,icon,temp,country,cityName}) {

  return (
    <div className="city">
      <div className="left">
        <span>{country}</span>
        <h4>{cityName}</h4>
        <p>{description}</p>
      </div>
      <div className="right">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <h2>{temp}°</h2>
      </div>
    </div>
  );
}

export default OtherLargeCities