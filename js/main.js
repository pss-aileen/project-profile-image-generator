"use strict";
{
  // 初期描画
  drawBase();
  drawMono();
  drawIcon();

  // イベントトリガー
  const selectInput = document.getElementById("color-type");
  selectInput.addEventListener("change", (e) => {
    const mode = selectMode();
    setMode(mode);
  });

  const monoInput = document.getElementById("background-monochrome");
  monoInput.addEventListener("input", () => {
    drawMono();
    drawIcon();
  });

  const gradientStartInput = document.getElementById(
    "background-gradient-start"
  );
  const gradientEndInput = document.getElementById("background-gradient-end");
  gradientStartInput.addEventListener("input", () => {
    drawGradient();
    drawIcon();
  });
  gradientEndInput.addEventListener("input", () => {
    drawGradient();
    drawIcon();
  });

  const btn = document.getElementById("btn");
  btn.addEventListener("click", downloadCanvas);

  // 関数

  function selectMode() {
    const select = document.getElementById("color-type");
    return select.value;
  }

  function setMode(mode) {
    if (mode === "monochrome") {
      drawMono();
      drawIcon();
    } else if (mode === "gradient") {
      drawGradient();
      drawIcon();
    }
  }

  function drawBase() {
    const canvas = document.getElementById("canvas-body");
    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    return { canvas, context, width, height };
  }

  function drawIcon() {
    const { canvas, context, width, height } = drawBase();

    const imagePath = "images/icon.svg";
    const image = new Image();
    image.src = imagePath;
    image.onload = function () {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  function drawGradient() {
    const { canvas, context, width, height } = drawBase();

    const startColorInput = document.getElementById(
      "background-gradient-start"
    );
    const endColorInput = document.getElementById("background-gradient-end");

    const startColor = startColorInput.value;
    const endColor = endColorInput.value;

    console.log(startColor);
    console.log(endColor);

    const gradient = context.createLinearGradient(0, 0, width, height);

    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  function drawMono() {
    const { canvas, context, width, height } = drawBase();

    const colorInput = document.getElementById("background-monochrome");
    const color = colorInput.value;

    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    console.log(color);
  }

  function downloadCanvas() {
    const canvas = document.getElementById("canvas-body");

    const dataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;

    downloadLink.download = "canvas_image.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
