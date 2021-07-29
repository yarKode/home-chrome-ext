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
    author.insertAdjacentText("afterbegin", `By: ${name}`);
  } catch (err) {
    console.error(err);
    body.style.backgroundImage = `url("https://images.unsplash.com/photo-1547955922-26be0c1600c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mjc1NjcwNTU&ixlib=rb-1.2.1&q=80&w=1080")`;
    author.insertAdjacentText("afterbegin", `By: Anton Lochov`);
  }
}

getAndSetImage();
