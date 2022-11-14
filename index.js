let daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
];
window.onload = function () {
  const menuButton = $(".hamburger");
  const mobileNav = $(".mobile-nav");
  menuButton.click(function () {
    $(menuButton).toggleClass("is-active");
    $(mobileNav).toggleClass("is-active");
  });
};
let weatherTemp = $(".temp");
let weatherTitle = $(".weather-title");
fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=44.50&lon=-84.71&appid=7d1f2802046e058ab87b457b6417030f&units=imperial"
)
  .then((response) => response.json())
  .then((data) => {
    let currentTempValue = data["list"][0]["main"]["temp"];

    $(weatherTitle).text(
      `Weather - ${(Math.round(currentTempValue * 10) / 10).toString()} ℉`
    );
    let date = new Date(data["list"][0]["dt_txt"]);
    let currentDay = date.getDay();
    $(".day1").text(daysArray[currentDay]);
    $(".day2").text(daysArray[currentDay + 1]);
    $(".day3").text(daysArray[currentDay + 2]);
    $(".day4").text(daysArray[currentDay + 3]);

    let hours = date.getHours();
    let hoursBeforeNextDay = 24 - hours;
    let iconArray = [[], [], []];
    let minArray = [Infinity, Infinity, Infinity];
    let maxArray = [-Infinity, -Infinity, -Infinity];

    let windArray = [0, 0, 0];
    for (let i = 0; i < 8; i++) {
      //?Day 2 stuff:
      let day2Index = i;
      let day2CurrentMin = data["list"][day2Index]["main"]["temp_min"];
      let day2CurrentMax = data["list"][day2Index]["main"]["temp_max"];
      let day2CurrentWind = data["list"][day2Index]["wind"]["speed"];
      let day2CurrentIcon = data["list"][day2Index]["weather"][0]["icon"].slice(
        0,
        2
      );
      iconArray[0].push(day2CurrentIcon);
      if (day2CurrentMin < minArray[0]) {
        minArray[0] = day2CurrentMin;
      }
      if (day2CurrentMax > maxArray[0]) {
        maxArray[0] = day2CurrentMax;
      }
      windArray[0] += day2CurrentWind;
      //?Day 3 stuff:
      day3Index = i + 8;
      let day3CurrentMin = data["list"][day3Index]["main"]["temp_min"];
      let day3CurrentMax = data["list"][day3Index]["main"]["temp_max"];
      let day3CurrentWind = data["list"][day3Index]["wind"]["speed"];
      let day3CurrentIcon = data["list"][day3Index]["weather"][0]["icon"].slice(
        0,
        2
      );
      iconArray[1].push(day3CurrentIcon);
      if (day3CurrentMin < minArray[1]) {
        minArray[1] = day3CurrentMin;
      }
      if (day3CurrentMax > maxArray[1]) {
        maxArray[1] = day3CurrentMax;
      }
      windArray[1] += day3CurrentWind;
      //?Day 4 stuff:
      day4Index = i + 16;
      let day4CurrentMin = data["list"][day4Index]["main"]["temp_min"];
      let day4CurrentMax = data["list"][day4Index]["main"]["temp_max"];
      let day4CurrentWind = data["list"][day4Index]["wind"]["speed"];
      let day4CurrentIcon = data["list"][day4Index]["weather"][0]["icon"].slice(
        0,
        2
      );
      iconArray[2].push(day4CurrentIcon);
      if (day4CurrentMin < minArray[2]) {
        minArray[2] = day4CurrentMin;
      }
      if (day4CurrentMax > maxArray[2]) {
        maxArray[2] = day4CurrentMax;
      }
      windArray[2] += day4CurrentWind;
    }
    for (let i = 0; i < 3; i++) {
      windArray[i] = Math.round((windArray[i] / 8) * 10) / 10;
      let modalIcon = getModalElement(iconArray[i]);
      let imgSelector;
      if (i == 0) {
        imgSelector = $(".img-2");
      } else if (i == 1) {
        imgSelector = $(".img-3");
      } else if (i == 2) {
        imgSelector = $(".img-4");
      }
      switch (modalIcon) {
        case "01":
          $(imgSelector).attr("src", "./Assets/Images/Sunny.png");
          break;
        case "02":
          $(imgSelector).attr("src", "./Assets/Images/PartlyCloudy.png");
          break;
        case "03":
          $(imgSelector).attr("src", "./Assets/Images/Cloudy.png");
          break;
        case "04":
          $(imgSelector).attr("src", "./Assets/Images/Cloudy.png");
          break;
        case "09":
          $(imgSelector).attr("src", "./Assets/Images/Rainy.png");
          break;
        case "10":
          $(imgSelector).attr("src", "./Assets/Images/Rainy.png");
          break;
        case "11":
          $(imgSelector).attr("src", "./Assets/Images/RainThunder.png");
          break;
        case "13":
          $(imgSelector).attr("src", "./Assets/Images/Snowy.png");
          break;
        case "50":
          $(imgSelector).attr("src", "./Assets/Images/Cloudy.png");
          break;
      }
    }
    $(".min-2").text(`Min - ${Math.round(minArray[0] * 10) / 10}`);
    $(".max-2").text(`Max - ${Math.round(maxArray[0] * 10) / 10}`);
    $(".wind-2").text(`Wind - ${windArray[0]}`);

    $(".min-3").text(`Min - ${Math.round(minArray[1] * 10) / 10}`);
    $(".max-3").text(`Max - ${Math.round(maxArray[1] * 10) / 10}`);
    $(".wind-3").text(`Wind - ${windArray[1]}`);

    $(".min-4").text(`Min - ${Math.round(minArray[2] * 10) / 10}`);
    $(".max-4").text(`Max - ${Math.round(maxArray[2] * 10) / 10}`);
    $(".wind-4").text(`Wind - ${windArray[2]}`);
  });
function getModalElement(arr) {
  let nodeMap = {};
  let maxEl = arr[0],
    maxCount = 1;
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    nodeMap[el] = ++nodeMap[el] || 1;
    if (nodeMap[el] > maxCount) {
      maxEl = el;
      maxCount = nodeMap[el];
    }
  }
  return maxEl;
}
