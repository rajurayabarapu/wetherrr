
import React,{useState} from "react";
import "./index.css";

const api = {
  key: "f71f573c94c12bebbba6944ba4aa91d2",
  base: "https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d)=>{
  let months=["January","February","March","April","May","June"
  ,"July ","August ","September ","October","November ","December"];
  let days=["Sunday","Monday","Tuesday","Wednesday",
  "Thursday", "Friday","Saturday"];

  let day= days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}



function App() {

const [query,setQuery]=useState("");
const [weather,setWeather]=useState({});

const Search = evt => {
  if(evt.key==="Enter"){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(res=>res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
      console.log(result);
    });
  }
}


  return (
    <div className= {(typeof weather.main !="undefined")?((weather.main.temp>16)?'app-warm':'app'):'app'} >
      <main>
        <div className= "search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="search.."
              onChange={e=>setQuery(e.target.value)}
              value={query}
              onKeyPress={Search}
        />
        </div>
        {(typeof weather.main != "undefined") ?
        (
          <div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        </div>
        ):('')}
        
      </main>
     
    </div>
  );
}

export default App;
