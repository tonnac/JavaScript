const clockContiner = document.querySelector(".js-clock"),
  clockTitle = document.querySelector("h1");

function timeFormat(time) {
  return time < 10 ? `0${time}` : time;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${timeFormat(hours)}:${timeFormat(
    minutes
  )}:${timeFormat(seconds)}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
