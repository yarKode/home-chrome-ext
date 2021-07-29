const body = document.getElementById("body");
const author = document.querySelector(".author");

async function getAndSetImage() {
  try {
    const res = await fetch(
      ` https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`
    );
    /* 
    const data = await res.json();

    console.log(data); */

    const {
      urls: { regular: img },
      user: { name },
    } = await res.json();

    body.style.backgroundImage = `url('${img}')`;
    author.insertAdjacentText("afterbegin", name);
  } catch (err) {
    console.error(err);
  }
}

getAndSetImage();
