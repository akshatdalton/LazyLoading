/* This runs after a web page loads */
/*
  true: start animation
  false: stop animation
*/
let animation = false;
const arcBoost = "arcBoost";
const arcBoostImage = "arcBoostImage";
const arcBoostSpan = "arcBoostSpan";
const API_NINJA_API_KEY = "<INSERT_YOUR_API_KEY_HERE>"; // Refer: https://api-ninjas.com/faq#as-1
const GIPHY_API_KEY = "<INSERT_YOUR_API_KEY_HERE>"; // Refer: https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key

const elemDiv = document.createElement('div');
elemDiv.className = arcBoost;

const elemImg = document.createElement('img');
elemImg.className = arcBoostImage;

const elemSpan = document.createElement('span');
elemSpan.className = arcBoostSpan;

async function setText() {
  try {
    let response = await fetch("https://api.api-ninjas.com/v1/facts?limit=1", {
      headers: { 'X-Api-Key': API_NINJA_API_KEY }
    });
    if (response.status === 200) {
      response = await response.json();
      elemSpan.textContent = response[0]["fact"];
    }
  } catch (e) {
    console.error(e);
  }
}

async function setGif() {
  try {
    let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}`)
    response = await response.json();

    if (response.meta.status === 200) {
      elemImg.srcset = response.data.images.original.url;
    }
  } catch (e) {
    console.error(e);
  }
}

window.addEventListener('load', async function () {
  animation = false;
  if (Math.random() < 0.5) {
    await setText();
    elemImg.style.visibility = "hidden";
  } else {
    await setGif();
    elemSpan.style.visibility = "hidden";
  }
});

window.addEventListener('beforeunload', function() {
  animation = true;
});

const interval = setInterval(function() {
   if (animation) {
      elemDiv.style.visibility = "visible";
   } else {
      elemDiv.style.visibility = "hidden";
   }
 }, 100);
 
elemDiv.appendChild(elemSpan);
elemDiv.appendChild(elemImg);
document.body.appendChild(elemDiv);

if (Math.random() < 0.5) {
  setText();
} else {
  setGif();
}
