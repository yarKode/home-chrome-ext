const body = document.getElementById("body");
const author = document.querySelector(".author");
const cryptoHeader = document.querySelector(".crypto");
const timer = document.querySelector(".time h3");

const CRYPTO_BASE_URL = `https://api.coingecko.com/api/v3/coins/`;

async function getAndSetImage() {
  try {
    const res = await fetch(
      ` https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`
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

    console.log(data);

    const {
      name,
      image: { small: smallImg },
      market_data: {
        current_price: { usd: priceInUsd },
      },
    } = data;
    console.log({ name, smallImg, priceInUsd });

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
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}

function renderTime() {
  timer.innerText = ("afterbegin", getTimeNow());
}

renderTime();
setInterval(() => {
  renderTime();
}, 1000);
getAndSetImage();
getCryptoData(`ethereum`);
