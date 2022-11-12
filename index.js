window.onload = function () {
  const menuButton = $(".hamburger");
  const mobileNav = $(".mobile-nav");
  menuButton.click(function () {
    $(menuButton).toggleClass("is-active");
    $(mobileNav).toggleClass("is-active");
  });
};
let weatherTemp = $(".temp");
let weatherDesc = $(".weather-description");
fetch(
  "https://api.openweathermap.org/data/2.5/weather?lat=44.50&lon=-84.71&appid=7d1f2802046e058ab87b457b6417030f&units=imperial"
)
  .then((response) => response.json())
  .then((data) => {
    let tempValue = data["main"]["temp"];
    let descValue = data["weather"]["description"];
    $(weatherTemp).text(Math.round(tempValue));
    $(weatherDesc).text(descValue);
  });
