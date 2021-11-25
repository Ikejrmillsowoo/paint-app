let canvas = document.getElementById("display");
let ctx = canvas.getContext("2d");
let colorPicker = document.querySelector("#color");
let defaultColor = colorPicker.value;
let size = document.getElementById("rangeInput");
let reset = document.getElementById("erase");

var board = document.getElementById("board");
const boardItem = getComputedStyle(board);
canvas.width = "700";
canvas.height = "500";

// mouse position
let mouse = { x: 0, y: 0 };
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

//track mouse events
canvas.addEventListener(
  "mousemove",
  function (e) {
    let mousePos = getMousePos(canvas, e);
    mouse.x = mousePos.x;
    mouse.y = mousePos.y;
  },
  false
);

// define line attributes
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = defaultColor;
ctx.lineWidth = size.value;

// function getColor(colorPicker) {
colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
});

size.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

canvas.addEventListener(
  "mousedown",
  function (e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener("mousemove", onPaint, false);
  },
  false
);

canvas.addEventListener(
  "mouseup",
  function () {
    canvas.removeEventListener("mousemove", onPaint, false);
  },
  false
);

var onPaint = function () {
  ctx.lineTo(mouse.x, mouse.y);
  ctx.stroke();
};

reset.addEventListener("click", () => {
  console.log("Clicked");
  ctx.strokeStyle = "#e0ffff";
});
