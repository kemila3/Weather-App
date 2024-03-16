import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import React from 'react';
import Axios from 'axios'

function App() {

 

  const [location,setLocation] = useState("");
  const [data,setData] = useState({});
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=61a0346d2f9322682f0e665f5d0fb1d9`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      Axios.get(url).then((res => {
        setData(res.data)
      }))
      setLocation('')
    }
   
  }

  return (
    <div className="App">
      <div className='search'>
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter location"
        type="text"
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temperature'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className='bottom'>
                    <div className='feels'>
                    {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}</p> : null}
                      <p>Feels Like</p>
                    </div>
                    <div className='humidity'>
                      {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                      <p>Humidity</p>
                    </div>
                    <div className='wind'>
                    {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                      <p>Wind Speed</p>
                    </div>
                  </div>
        }
          
        </div>
    </div>
  );
}

export default App;
