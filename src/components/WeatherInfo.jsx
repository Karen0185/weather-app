import { BsSearch } from 'react-icons/bs'
import Sun from '../assets/images/Sun.svg'
import SunCloud from '../assets/images/SunCloud.svg'
import Cloud from '../assets/images/Cloud.svg'
import CloudRain from '../assets/images/CloudRain.svg'
import Rain from '../assets/images/Rain.svg'
import Snow from '../assets/images/Snow.svg'
import '../assets/styles/WeatherInfo.scss'
import { useEffect, useState } from 'react'



const WeatherInfo = ({ weatherResult, place, setPlace, setSendRequest, icon, setIcon }) => {


    const iconId = weatherResult.weather[0].icon;

    setIcon(
        iconId == '01n' || iconId == '01d' ? Sun : 
        (iconId == '02n' || iconId == '02d' ? SunCloud : 
        (iconId == '09n' || iconId == '09d' ? CloudRain :
        (iconId == '10n' || iconId == '10d' ? Rain : 
        (iconId == '13n' || iconId == '13d' ? Snow : Cloud) ))
        )
    );
    useEffect(() => {
        setIcon(
            iconId == '01n' || iconId == '01d' ? Sun : 
            (iconId == '02n' || iconId == '02d' ? SunCloud : 
            (iconId == '09n' || iconId == '09d' ? CloudRain :
            (iconId == '10n' || iconId == '10d' ? Rain : Cloud))
            )
        )
    },[iconId])

    const date = new Date();

    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes;

    let daysOfWeek = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота"
      ];
      
      let currentDate = new Date();
      let day = currentDate.getDay();
      let russianDayOfWeek = daysOfWeek[day];

    //   console.log(weatherResult);     

    return(
        <div className="WeatherInfo">
            <div className="search">
                <form onSubmit={(e) => {
                        e.preventDefault()
                        setSendRequest(true)
                        setIcon(
                            iconId == '01n' || iconId == '01d' ? Sun : 
                            (iconId == '02n' || iconId == '02d' ? SunCloud : 
                            (iconId == '09n' || iconId == '09d' ? CloudRain :
                            (iconId == '10n' || iconId == '10d' ? Rain : Cloud))
                            )
                        )
                    }}>
                <label>
                    <BsSearch className='icon' />
                    <input type="text" name='search' placeholder='Поиск мест'  value={place} onInput={(e) => {
                        setPlace(e.target.value)
                    }}/>
                </label>

                </form>
            </div>
            <div className="info">
                <div className="right">
                    <div className="weatherIcon">
                        <img className='weatherIcon' src={icon} alt="SunCloud" />
                    </div>
                </div>
                <div className="left">
                    <div className="city">{weatherResult.name}</div>
                    <div className="temperature">{Math.round(weatherResult.main.temp)}°C</div>
                    <div className="date">{russianDayOfWeek}, <span className='time'>{time}</span></div>
                </div>
            </div>
            <div className="line"></div>
            <div className="details">
                <div className="detail">
                    <img src={icon} alt="" />
                    <p>{weatherResult.weather[0].description}</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherInfo;