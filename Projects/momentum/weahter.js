const weather = document.querySelector(".js-weather");
const API_KEY = "f263f85edc966ea6897e4188a1ce5285";
const COORDS = "coords";

function getWeahter(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeahter(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (null === loadedCords) {
    askForCoords();
  } else {
    const { latitude, longitude } = JSON.parse(loadedCords);
    getWeahter(latitude, longitude);
  }
}

function init() {
  loadCoords();
}

init();
