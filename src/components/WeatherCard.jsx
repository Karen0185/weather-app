const WeatherCard = ({icon, date, temperatureDay, temperatureNight, time, setCurrentResult, currentResult, item}) => {

    return(
        <div className="weatherCard" onClick={() => {
            item ? setCurrentResult({
                feelsLike: item.main.feels_like,
                windSpeed: Math.round(item.wind.speed * 1.60934),
                humidity: item.main.humidity,
                visibility: item.visibility / 1000,
                pressure: item.main.pressure
            }) : console.log('');
            
        }}>
            <div className="date"><span>{date} </span> {time}</div>
            <div className="icon"><img src={icon} alt="" /></div>
            <div className="temperature"><span>{temperatureDay}° </span><span className='nightTemperature'>{temperatureNight}°</span></div>
        </div>
    );
}

export default WeatherCard