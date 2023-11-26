let color;
const emoji = "🐶";

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

    // context.fillStyle = color;
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.font = "normal 140px/1 serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    // context.shadowColor = "rgba(0, 0, 0, 0.2)"; // 影の色
    context.shadowBlur = 16; // 影のぼかしの強さ
    context.shadowOffsetX = 0; // 影のオフセット（水平方向）
    context.shadowOffsetY = 4; // 影のオフセット（垂直方向）
    
    const emojiHeight = context.measureText(emoji).actualBoundingBoxAscent;
    context.strokeText(emoji, x, y);
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