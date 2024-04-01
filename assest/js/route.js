'use strict';
// This funcinality is for import the some function from other JS Page
import { updateWeather, error404 } from "./app.js"

// This is a default location
const defaultLocation = "#/weather?lat=26.4473866&lon=80.1735644"; // Kanpur

// This funcinality for a location search
const approximatelocation = async () => {
  try {
    let ipResponse = await fetch("https://api.ipify.org/?format=json");
    let ipData = await ipResponse.json();
    let ip = ipData.ip;
    let locationResponse = await fetch(`https://ipinfo.io/${ip}?token=c177813f87d9fa`);
    let locationData = await locationResponse.json();
    const [latitude, longitude] = locationData.loc.split(",");
    updateWeather(`lat=${latitude}`, `lon=${longitude}`)
    window.location.hash = `#/approximatelocation`;
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};

// This funcinality for get a current location
const currentLoction = () => {
  window.navigator.geolocation.getCurrentPosition(res => {
    const { latitude, longitude } = res.coords;
    updateWeather(`lat=${latitude}`, `lon=${longitude}`)
  }, err => {
    window.location.hash = "#/approximatelocation";
  })
}

// This funcinality for a searched location
const searchedLoction = query => updateWeather(...query.split("&"));

// This funcinality for a routes
const routes = new Map([
  ["/current-location", currentLoction],
  ["/weather", searchedLoction],
  ["/approximatelocation", approximatelocation]
]);

// This funcinality for check the current location hash
const checkHash = () => {
  const requestURL = window.location.hash.slice(1);
  const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];
  routes.get(route) ? routes.get(route)(query) : error404();
}
// This funcinality for check the current location hash was correct or not
window.addEventListener("hashchange", checkHash)

// This funcinality for load the location data
window.addEventListener("load", () => {
  if (!window.location.hash)
    window.location.hash = "#/current-location";
  else
    checkHash();
})