const body = document.getElementById("body");
const author = document.querySelector(".author");
const cryptoHeader = document.querySelector(".crypto");
const timer = document.querySelector(".time h3");
const weatherContainer = document.querySelector(".weather");
const tempContainer = document.querySelector(".temp");
const locationContainer = document.querySelector(".location");

const CRYPTO_BASE_URL = `https://api.coingecko.com/api/v3/coins/`;

async function getAndSetImage() {
  try {
    const res = await fetch(
      ` https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=car`
    );

    const {
      urls: { regular: img },
      user: { name },
    } = await res.json();

    body.style.backgroundImage = `url('${img}')`;
    author.insertAdjacentText("afterbegin", `By: ${name}`);
  } catch (err) {
    console.error(err);
    body.style.backgroundImage = `url("https://images.unsplash.com/photo-1547955922-26be0c1600c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mjc1NjcwNTU&ixlib=rb-1.2.1&q=80&w=1080")`;
    author.insertAdjacentText("afterbegin", `By: Anton Lochov`);
  }
}

async function getCryptoData(cryptoId) {
  try {
    const res = await fetch(`${CRYPTO_BASE_URL}/${cryptoId}`);

    if (!res.ok) throw Error("Status of request to coingecko - FAILED 😿");

    const data = await res.json();

    const {
      name,
      image: { small: smallImg },
      market_data: {
        current_price: { usd: priceInUsd },
      },
    } = data;

    cryptoHeader.innerHTML = `
    <img src=${smallImg} alt='icon of crypto' />
    <p>${name}: ${priceInUsd}</p>
    `;
  } catch (err) {
    console.error(err);
    cryptoHeader.insertAdjacentElement(
      "afterbegin",
      "Crypto Prices are not available at the moment 🙈"
    );
  }
}

function getTimeNow() {
  const date = new Date();

  const hours = date.getHours();
  const minutes =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  const seconds =
    date.getSeconds().toString().length === 1
      ? `0${date.getSeconds()}`
      : date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}

function renderTime() {
  timer.innerText = ("afterbegin", getTimeNow());
}

async function getWeatherIcon(iconId) {
  try {
    const res = await fetch(
      `http://openweathermap.org/img/wn/${iconId}@2x.png`
    );

    /*     const data = res.json(); */
    if (!res.ok) return;
    const iconUrl = res.url;

    return iconUrl;
  } catch (err) {
    console.log(err);
  }
}
async function getWeather(lat, lon, units = "") {
  try {
    const res = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`
    );

    if (!res.ok) return;

    const data = await res.json();
    console.log(data);

    const {
      main: { temp },
      name: location,
    } = data;
    const icon = await getWeatherIcon(data.weather[0].icon);
    renderWeather(icon, weatherContainer, temp, location);
  } catch (err) {
    console.error(err);
  }
}

function renderWeather(iconUrl, parentEl, temp, location) {
  const icon = `<img src=${iconUrl} alt='weather icon'/>`;

  parentEl.insertAdjacentHTML("afterbegin", icon);
  tempContainer.innerHTML = `<p class="temp">${Math.round(temp)}&#176;C</p>`;
  locationContainer.innerText = location;
}

function getCurrentLocation() {
  if (!navigator.geolocation) return;
  const data = navigator.geolocation.getCurrentPosition((data) => {
    const {
      coords: { latitude, longitude },
    } = data;

    getWeather(latitude, longitude, "metric");
  });
}

getAndSetImage();
getCurrentLocation();
renderTime();
setInterval(() => {
  renderTime();
}, 1000);

getCryptoData(`ethereum`);
