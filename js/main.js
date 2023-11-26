function draw() {

  let canvas = document.getElementById("tutorial");
  
  if (canvas.getContext) {
    let context = canvas.getContext("2d");
    console.log("there is context");

    const width = canvas.width;
    const height = canvas.height;

    const x = canvas.width / 2;
    const y = canvas.height / 2;

    context.fillStyle = "pink";
    context.fillRect(0, 0, width, height);

    context.font = "normal 160px/1 serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    
    const emojiHeight = context.measureText("😍").actualBoundingBoxAscent;
    context.strokeText("😍", x, y);
  } else {
    console.log("no context");
  }
}

draw();


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