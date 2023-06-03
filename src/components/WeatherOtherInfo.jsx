import Sun from '../assets/images/Sun.svg';
import SunCloud from '../assets/images/SunCloud.svg';
import SunCloudRain from '../assets/images/SunCloudRain.svg';
import Cloud from '../assets/images/Cloud.svg';
import CloudRain from '../assets/images/CloudRain.svg';
import Rain from '../assets/images/Rain.svg';
import Sunrise from '../assets/images/Sunrise.svg'
import Sunset from '../assets/images/Sunset.svg'
import WeatherCard from './WeatherCard';
import { useState, useEffect } from 'react';
import '../assets/styles/WeatherOtherInfo.scss'

const WeatherOtherInfo = ({ weatherResult, icon, }) => {

        const [isWeek, setIsWeek] = useState(true);
        const [forecastResult, setForecastResult] = useState();
        const [afterDaysResult, setAfterDaysResult] = useState([]);
        const [afterDays, setAfterDays] = useState([]);
        const [toDayResult, setToDayResult] = useState([])
        const [itemIcon, setItemIcon] = useState()
        const [currentResult, setCurrentResult] = useState()
        const apiKey = '8963274cd783ab69d4c8f11b1fa611be';

        let russianDayOfWeek;
        let direction;
        let sunset;
        let sunrise;
        let iconId;

        
        
        useEffect(() => {
            if(weatherResult) {
                setTimeout(() => {
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${weatherResult.id}&units=metric&appid=${apiKey}&lang=ru`)
                    .then(response => response.json())
                    .then(data => setForecastResult(data))
                    .catch(error => console.log(error))

                },100)
            }
        }, [weatherResult])

          let daysOfWeek = [
              "Вт",
              "Пн",
              "Ср",
              "Чт",
              "Пт",
              "Сб",
              "Вс"
          ];


          useEffect(() => {
            if(forecastResult) {
                const updatedAfterDaysResult = [];
                const updatedAfterDays = [];
                for (let i = 0; i < 40; i += 8) {
                    let timestampInSeconds = forecastResult.list[i].dt;
                    let date = new Date(timestampInSeconds * 1000);
                    let day = date.getDay();
                    russianDayOfWeek = daysOfWeek[day];

                    if (updatedAfterDays.length < 6) {
                      updatedAfterDays.push(russianDayOfWeek);
                      updatedAfterDaysResult.push(forecastResult.list[i]);
                      if(i == 32) {
                        updatedAfterDays.push(russianDayOfWeek);
                        updatedAfterDaysResult.push(forecastResult.list[32]);
                      }
                    }
                  }
                  
                  setAfterDays(updatedAfterDays);
                  setAfterDaysResult(updatedAfterDaysResult);

                  const updatedToDayResult = [];
                  for (let j = 0; j < 9; j++) {
                    updatedToDayResult.push(forecastResult.list[j])
                    setToDayResult(updatedToDayResult)
                    }
                }
            }, [forecastResult])


        if (document.querySelector('.weatherCards')) {
            const element = document.querySelector('.weatherCards');
            let scrollPosition = 0;
            let lastTimestamp = 0;
          
            element.addEventListener('wheel', (event) => {
              const delta = Math.sign(event.deltaY);
              const currentTime = performance.now();
              const timeElapsed = currentTime - lastTimestamp;
          
              scrollPosition += delta * 100;
              if (scrollPosition < 50) scrollPosition = 0;
              if (scrollPosition > element.scrollWidth - element.clientWidth) {
                scrollPosition = element.scrollWidth - element.clientWidth;
              }
          
              if (timeElapsed > 1) {
                element.scroll({
                  left: scrollPosition,
                  behavior: 'smooth'
                });
                lastTimestamp = currentTime;
              }
          
              event.preventDefault();
            });
          }
          
          if(document.querySelector('.WeatherOtherInfo')) {
              document.querySelector('.humidityGraphic').style.bottom = `calc(${weatherResult.main.humidity}% - 25px`

            function getWindDirection(deg) {
                const direction = [
                  "северный", "северо-северо-восточный", "северо-восточный", "востоко-северо-восточный",
                  "восточный", "востоко-юго-восточный", "юго-восточный", "юго-юго-восточный",
                  "южный", "юго-юго-западный", "юго-западный", "западо-юго-западный",
                  "западный", "западо-северо-западный", "северо-западный", "северо-северо-западный"
                ];
              
                const index = Math.round(deg / 22.5) % 16;
                return direction[index];
              }
              
              let deg = weatherResult.wind.deg;
              direction = getWindDirection(deg);

              let sunriseDate = new Date(weatherResult.sys.sunrise * 1000);
              let sunsetDate = new Date(weatherResult.sys.sunset * 1000);

              let sunsetHour = sunsetDate.getHours() < 10 ? '0' + sunsetDate.getHours() : sunsetDate.getHours();
              let sunsetMinute = sunsetDate.getMinutes() < 10 ? '0' + sunsetDate.getMinutes() : sunsetDate.getMinutes();

              let sunriseHour = sunriseDate.getHours() < 10 ? '0' + sunriseDate.getHours() : sunriseDate.getHours();
              let sunriseMinute = sunriseDate.getMinutes() < 10 ? '0' + sunriseDate.getMinutes() : sunriseDate.getMinutes();


                sunset = sunsetHour + ":" + sunsetMinute;
                sunrise = sunriseHour +  ":" + sunriseMinute;


              
            }
            function determineRating(number) {
              if (number >= 0 && number <= 3) {
                return 'плохой'; 
              } else if (number >= 4 && number <= 7) {
                return 'средний';
              } else {
                return 'хороший'; 
              } 
            }

            
            return(
        <div className="WeatherOtherInfo">
            <div className="top">
                <button className={isWeek ? 'toDay' : 'today active'} onClick={() => {
                    setIsWeek(false)
                }}>Сегодня</button>
                <button className={isWeek ? 'week active' : 'week'} onClick={() => {
                    setIsWeek(true)
                }}>Неделя</button>
            </div>
            {
                isWeek ? 
                <div className="weatherCards">
                    <WeatherCard icon={icon} date="Сегодня" 
                                temperatureDay={Math.round(weatherResult.main.temp)} 
                                temperatureNight={Math.round(weatherResult.main.temp_min) - 5}
                                currentResult={currentResult}
                                setCurrentResult={setCurrentResult}
                                item={weatherResult}
                                />
                    {
                        afterDaysResult.map((item,idx) => {
                            iconId = item.weather[0].icon
                            return(
                                idx == 5 ? 
                                <WeatherCard icon={iconId == '01n' || iconId == '01d' ? SunCloud : 
                                    (iconId == '02n' || iconId == '02d' ? Sun : 
                                    (iconId == '09n' || iconId == '09d' ? Rain :
                                    (iconId == '10n' || iconId == '10d' ? CloudRain : SunCloud))
                                    )
                                } 
                                date={daysOfWeek[idx - 1]} 
                                temperatureDay={Math.round(item.main.temp) - 2} 
                                temperatureNight={Math.round(item.main.temp_min) - 5}
                                currentResult={currentResult}
                                setCurrentResult={setCurrentResult}
                                item={item}
                                /> :
                                <WeatherCard icon={iconId == '01n' || iconId == '01d' ? Sun : 
                                    (iconId == '02n' || iconId == '02d' ? SunCloud : 
                                    (iconId == '09n' || iconId == '09d' ? CloudRain :
                                    (iconId == '10n' || iconId == '10d' ? Rain : Cloud))
                                    )
                                } 
                                date={afterDays[idx]} 
                                temperatureDay={Math.round(item.main.temp)} 
                                temperatureNight={Math.round(item.main.temp_min) - 6}
                                currentResult={currentResult}
                                setCurrentResult={setCurrentResult}
                                item={item}
                                />
                            )
                        })
                    }
                </div> :
                <div className="weatherCards week">

                    {
                        toDayResult.map((item,idx) => {
                            const dateObj = new Date();
                            const year = dateObj.getFullYear();
                            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                            const day = String(dateObj.getDate()).padStart(2, "0");
                            const formattedDate = `${year}-${month}-${day}`;


                            
                            const time = item.dt_txt.split(" ")[1].slice(0, -3);
                            return(
                                    item.dt_txt.split(" ")[0] ==  formattedDate ?

                                <WeatherCard icon={iconId == '01n' || iconId == '01d' ? Sun : 
                                (iconId == '02n' || iconId == '02d' ? SunCloud : 
                                (iconId == '09n' || iconId == '09d' ? CloudRain :
                                (iconId == '10n' || iconId == '10d' ? Rain : Cloud))
                                )} 
                                date={'Сегодня'}
                                time={time}
                                temperatureDay={Math.round(weatherResult.main.temp)} 
                                temperatureNight={Math.round(weatherResult.main.temp_min) - 5} 
                                /> :

                                <WeatherCard icon={item.weather[0].icon == '01n' || item.weather[0].icon == '01d' ? Sun : 
                                (item.weather[0].icon == '02n' || item.weather[0].icon == '02d' ? SunCloud : 
                                (item.weather[0].icon == '09n' || item.weather[0].icon == '09d' ? CloudRain :
                                (item.weather[0].icon == '10n' || item.weather[0].icon == '10d' ? Rain : Cloud))
                                )} 
                                date={'Завтра'}
                                time={time}
                                temperatureDay={Math.round(item.main.temp)} 
                                temperatureNight={Math.round(item.main.temp_min) - 6}/>
                                )
                        })
                    }
                </div>
            
            }
            <div className="moreInfo">
                <div className='title'>Сегодняшние события</div>
                <div className="moreInfoCards">
                    <div className="moreInfoCard">
                        <div className="name">Ощущается как</div>
                        <div className="info feel_like">
                            {/* <p>{Math.floor(weatherResult.main.feels_like)}°C</p> */}
                            <p>{currentResult ? Math.floor(currentResult.feelsLike) : Math.floor(weatherResult.main.feels_like)}°C</p>
                        </div>
                    </div>
                    <div className="moreInfoCard">
                        <div className="name">Статус ветра</div>
                        <div className="info">
                            <p>{ currentResult ? Math.round(currentResult.windSpeed * 1.60934) : Math.round(weatherResult.wind.speed * 1.60934)}<span>  km/h</span></p>
                        </div>
                        <div className="description">
                            <p>{direction}</p>
                        </div>
                    </div>
                    <div className="moreInfoCard">
                        <div className="name">Восход / Закат</div>
                        <div className="sunrise">
                            <img src={Sunrise} alt="" />
                            <p>{sunrise}</p>
                        </div>
                        <div className="sunset">
                            <img src={Sunset} alt="" />
                            <p>{sunset}</p>
                        </div>
                    </div>
                    <div className="moreInfoCard">
                        <div className="name">Влажность</div>
                        <div className="info">
                            <p className='percent'>{currentResult ? currentResult.humidity : weatherResult.main.humidity}</p>
                            <div className="graphic">
                                <div className="graphicCircle humidityGraphic"></div>
                            </div>
                        </div>
                        <div className="description">
                            <p>нормальный</p>
                        </div>
                    </div>
                    <div className="moreInfoCard">
                        <div className="name">Видимость</div>
                        <div className="info">
                            <p>{currentResult ? currentResult.visibility : weatherResult.visibility / 1000} <span>km</span></p>
                        </div>
                        <div className="description">
                            <p>{determineRating(weatherResult.visibility / 100)}</p>
                        </div>
                    </div>
                    <div className="moreInfoCard">
                        <div className="name">Давление</div>
                        <div className="info">
                            <p>{currentResult ? currentResult.pressure : weatherResult.main.pressure}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherOtherInfo;