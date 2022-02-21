import React, { useState } from 'react'
import axios from 'axios'
import ReactDom from 'react-dom';
import CityDataLocal from "./data/cities.json";
import {Button} from '@material-ui/core';

export default function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [cityid, setCityid] = useState('')

  const loadedData = JSON.stringify(CityDataLocal.List);
  const city = JSON.parse(loadedData);
  console.log("App on");
  console.log(city);
  console.log(cityid,"Paasing througth down");

  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityid}&appid=7bb92bcfbe80e3de3eed227c8ef14cb6`
    const getId = (event) => {

        axios.get(url).then((response) => {
          setData(response.data)
          console.log(response.data,"data")
        })
      
    }

  return ( 
    <div className="app">
      <div className="search">

      {city.map((city,id)=>
      <span>
        <Button variant="contained"   onClick={event =>getId()+ setCityid(city.CityCode)+console.log(city.CityCode)}>{city.CityName}</Button>
      </span>
      
      )}

      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }


        <sapn center>Uditha Nayanajith@2022 </sapn>
      </div>
    </div>
  );
}
