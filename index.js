const body = document.getElementById("body");

async function getAndSetImage() {
  try {
    const res = await fetch(
      ` https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`
    );

    const {
      urls: { regular: img },
    } = await res.json();

    body.style.backgroundImage = `url('${img}')`;
  } catch (err) {
    console.error(err);
  }
}

getAndSetImage();
