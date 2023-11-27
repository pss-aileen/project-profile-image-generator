let color;

function getBackgroundColor() {
  const input = document.getElementById("background-monochrome");
  color = input.value;
  
  input.addEventListener("input", () => {
    const target = document.getElementById("background-monochrome");
    color = target.value;
    console.log(color);
    draw();
  });
}

getBackgroundColor();


const select = document.getElementById("color-type");

select.addEventListener("change", () => {
  const target = document.getElementById("color-type");
  console.log(target.value);
});


const gradientStart = document.getElementById("background-gradient-start");
const gradientEnd = document.getElementById("background-gradient-end");

console.log(gradientStart.value);
console.log(gradientEnd.value);

getGradientProperty();
setGradient();

function getGradientProperty() {
  const gradientStart = document.getElementById("background-gradient-start");
  const gradientEnd = document.getElementById("background-gradient-end");
  
  const gradientStartColor = gradientStart.value;
  const gradientEndColor = gradientEnd.value;
  
  return { gradientStartColor, gradientEndColor };
}

function setGradient(start, end) {
  const testArea = document.getElementById("test-content");
  testArea.style.backgroundImage = `linear-gradient(0deg, ${gradientEnd.value}, ${gradientStart.value})`;
}

gradientStart.addEventListener("change", () => {
  const { gradientStartColor, gradientEndColor } = getGradientProperty();
  setGradient(gradientStartColor, gradientEndColor);
  draw(gradientStartColor, gradientEndColor);
});

gradientEnd.addEventListener("change", () => {
  const { gradientStartColor, gradientEndColor } = getGradientProperty();
  setGradient(gradientStartColor, gradientEndColor);
  draw(gradientStartColor, gradientEndColor);
});



function draw(gradientStart, gradientEnd) {

  let canvas = document.getElementById("tutorial");
  
  if (canvas.getContext) {
    let context = canvas.getContext("2d");
    console.log("there is context");

    const width = canvas.width;
    const height = canvas.height;

    const x = canvas.width / 2;
    const y = canvas.height / 2;

    const gradient = context.createLinearGradient(0, 0, width , height);

    gradient.addColorStop(0, `${gradientStart}`);
    gradient.addColorStop(1, `${gradientEnd}`);


    // 画像のパスを指定
    const imagePath = '../images/icon.png';

    // 画像を読み込んで描画
    const image = new Image();
    image.onload = function() {
      // Canvas上に画像を描画
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = imagePath;


    // context.fillStyle = color;
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  } else {
    console.log("no context");
  }
}

draw("red", "yellow");


function downloadCanvas() {
  let canvas = document.getElementById("tutorial");

  let dataURL = canvas.toDataURL("image/png");
  let downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  
  downloadLink.download = "canvas_image.png";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

const btn = document.getElementById("btn");

btn.addEventListener("click", downloadCanvas);