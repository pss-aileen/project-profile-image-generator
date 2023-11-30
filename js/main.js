"use strict";
{
  // 初期描画
  getCanvasContext();
  drawGradient();
  drawIcon();

  // イベントトリガー
  document.getElementById("color-type").addEventListener("change", handleColorTypeChange);
  document.getElementById("background-single").addEventListener("input", handleSingleInput);
  document.getElementById("background-gradient-start").addEventListener("input", handleGradientInput);
  document.getElementById("background-gradient-end").addEventListener("input", handleGradientInput);
  document.getElementById("btn").addEventListener("click", downloadCanvas);

  // handle
  function handleColorTypeChange() {
    const mode = selectMode();
    setMode(mode);
  }

  function handleSingleInput() {
    drawSingle();
    drawIcon();
  }

  function handleGradientInput() {
    drawGradient();
    drawIcon();
  }

  // 関数
  function selectMode() {
    return document.getElementById("color-type").value;
  }

  function setMode(mode) {
    getCanvasContext();
    mode === "single" ? drawSingle() : drawGradient();
    mode === "single" ? activeSingleTab() : activeGradientTab();
    drawIcon();
  }

  function activeSingleTab() {
    document.getElementById("tab-gradient").classList.remove("is-active");
    document.getElementById("tab-single").classList.add("is-active");
  }

  function activeGradientTab() {
    document.getElementById("tab-single").classList.remove("is-active");
    document.getElementById("tab-gradient").classList.add("is-active");
  }

  function getCanvasContext() {
    const canvas = document.getElementById("canvas-body");
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    return { canvas, context, width, height };
  }

  function drawIcon() {
    const { canvas, context, width, height } = getCanvasContext();
    const imagePath = "images/icon.svg";
    const image = new Image();
    image.src = imagePath;
    image.onload = () => context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  function drawGradient() {
    const { context, width, height } = getCanvasContext();
    const startColor = document.getElementById("background-gradient-start").value;
    const endColor = document.getElementById("background-gradient-end").value;
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }

  function drawSingle() {
    const { context, width, height } = getCanvasContext();
    const color = document.getElementById("background-single").value;
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
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
