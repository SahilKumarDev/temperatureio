'use strict';

// This is API key
const apiKey = "cac19b5c9897eccbcfeafbb08b7cacc7";

// This is connection between the server(API) and the client(Frontend)
export const fetchData = (URL, callback) => {
  fetch(`${URL}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => callback(data))
}

// This funcinality is fetch the API from the Server of OpenWeather.org
export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
  },
  airPollution(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
  },
  reverseGeo(lat, lon) {
    return `https://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
  },
  /**
   * 
   * @param {string} query search query e.g. :"Kanpur" , "India"  
   *
  **/
  geo(query) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
  }
}