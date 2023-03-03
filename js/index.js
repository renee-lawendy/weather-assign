var today = new Date();
var dayName = today.toLocaleString("default", { month: "long" });
console.log(dayName);
let finalResult;

let locationSearch = document.querySelector("#location-search");
let elements = document.querySelector(".elements");
const searchBtn = document.querySelector("#search-btn");
console.log(elements);
async function getWeather(countery = "cairo") {
  let result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key= 214c33156a434c7888c72532231902&q=${countery}&days=3`
  );
  finalResult = await result.json();
  console.log(finalResult);
  let weatherArr = finalResult.forecast.forecastday;
  console.log(weatherArr);
  if (!finalResult.error) {
    render(finalResult);
    renderTwo(weatherArr);
  }
}

getWeather();

locationSearch.addEventListener("keyup", function (e) {
  if (e.target.value !== "") {
    getWeather(e.target.value);
  }
});

function render(finalResult) {
  var today = new Date();
  var dayName = today.toLocaleString("default", { weekday: "long" });
  var day = today.getDate();
  var month = today.toLocaleString("default", { month: "long" });
  let element = `<div class="col-md-4 "><div class="today-weather">
                                <div class="today-header">
                                    <div class="day">${dayName}</div>
                                    <div class=" date">${day} ${month}</div>
                                </div>
                                <div class="today-body">
                                    <div class="location">${finalResult.location.name}</div>
                                    <div class="degree d-flex justify-content-between">
                                        <div class="today-num">${finalResult.current.temp_c}
                                            <sup>o</sup>c</div>
                                        <div class="weather-icon"><img class="current-weather w-100" src="${finalResult.current.condition.icon}" alt=""></div>
                                    </div>
                                    <div class="desc">${finalResult.current.condition.text}</div>
                                </div>
                            </div>
                           <div class="span-container"> <span class="me-2"><img src="img/icon-umberella.png"alt="" > 20%</span>
                            <span class="me-2"><img src="img/icon-wind.png"  alt="">18Km/h</span>
                            <span class="me-2"><img src="img/icon-wind.png" alt=""> East</span></div></div>`;

  elements.innerHTML = element;
}
function renderTwo(array) {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  var tomorrowName = tomorrow.toLocaleString("default", { weekday: "long" });
  let afterTomorrow = new Date();
  afterTomorrow.setDate(today.getDate() + 2);
  var afterTomorrowName = afterTomorrow.toLocaleString("default", {
    weekday: "long",
  });
  let element = "";
  for (let i = 1; i < array.length; i++) {
    let days = [, tomorrowName, afterTomorrowName];

    element += `    <div class="col-md-4 ">
                            <div class="tommorow-weather">
                                <div class="tomorrow-header">
                                    <div class="day m-auto">${days[i]}</div>
                                </div>
                                <div class="tomorrow-body m-auto">
                                    <div class="degreen m-auto text-center">
                                        <div class="weather-icon m-auto mt-2"><img class="current-weather w-50  " src="${array[i].day.condition.icon}" alt=""></div>
                                        <div ><div class="max">${array[i].day.maxtemp_c}
                                            <sup>o</sup>c</div><div class="min">${array[i].day.mintemp_c}
                                            <sup>o</sup></div></div>
                                    </div>
                                    <div class="desc text-center">${array[i].day.condition.text}</div>
                                </div>
                            </div>
                        </div>`;
  }
  elements.innerHTML += element;
}

// async function cuurentWaether(countery = parseInt) {
//   let current = await fetch(
//     `http://api.weatherapi.com/v1/current.json?key=214c33156a434c7888c72532231902&q=${countery}&hour=12`
//   );
//   let finalCurrent = await current.json();
//   console.log(finalCurrent);
// }
// cuurentWaether();
