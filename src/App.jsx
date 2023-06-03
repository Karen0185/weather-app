import { useState, useEffect } from 'react';
import './App.scss';
import WeatherInfo from './components/WeatherInfo';
import WeatherOtherInfo from './components/WeatherOtherInfo';

function App() {

  const [weatherResult, setWeatherResult] = useState();
  const [place, setPlace] = useState('');
  const [sendRequest, setSendRequest] = useState(true);
  const [icon, setIcon] = useState()

  const apiKey = '8963274cd783ab69d4c8f11b1fa611be';
  useEffect(() => {

      if(sendRequest) {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place != '' ? place : 'Москва'}&units=metric&appid=${apiKey}&lang=ru`)
        .then(response => response.json())
        .then(data => setWeatherResult(data))
        .catch(error => console.error(error));  
        setSendRequest(false)
        setPlace('')

        
      }
    }, [sendRequest]);


    
    
    
    if(weatherResult) {
    return (
      <div className="App">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="appBg"></div>
  
        <div className="wrapper">
          <WeatherInfo weatherResult={weatherResult} place={place} setPlace={setPlace} setSendRequest={setSendRequest} icon={icon} setIcon={setIcon}/>
          <WeatherOtherInfo weatherResult={weatherResult} icon={icon}  />
        </div>
      </div>
    );
  }
}

export default App;
