// Initializare detalii despre forme
const button_select = document.getElementById("select");
const button_text = document.getElementById("text");
const button_save = document.getElementById("save");
const button_export = document.getElementById("export");
const button_line = document.getElementById("line");
const button_rectangle = document.getElementById("rectangle");
const button_circle = document.getElementById("circle");
const button_delete = document.getElementById("delete");

const form_x = document.getElementById("x-form");
const form_y = document.getElementById("y-form");
const form_height = document.getElementById("height-form");
const form_width = document.getElementById("width-form");
const form_rotation = document.getElementById("rotation-form");
const form_color = document.getElementById("color-form");
const stroke_color = document.getElementById("color-stroke");
const stroke_width = document.getElementById("width-stroke");

const form_name = document.getElementById("details-form-name");

// Initializare svg
const svg = document.getElementById("svg");

let strokeColor = "#06283D";

let selected = svg;

let index = 0;

let moved = null;
let isMoved = false;

let initialX = 0,
  initialY = 0,
  initialX2 = 0,
  initialY2 = 0,
  movedX,
  movedY;

// Initializare mediu de lucru
svg.setAttribute("width", svg.clientWidth);
svg.setAttribute("height", svg.clientHeight);

let canvas = document.createElementNS("http://www.w3.org/2000/svg", "rect");
canvas.setAttribute("id", "canvas");
canvas.setAttribute("x", 0);
canvas.setAttribute("y", 0);
canvas.setAttribute("height", canvas.clientHeight);
canvas.setAttribute("width", canvas.clientWidth);
canvas.setAttributeNS(
  "http://www.w3.org/2000/xmlns/",
  "xmlns:xlink",
  "http://www.w3.org/1999/xlink"
);
canvas.setAttribute("fill", "white");
svg.appendChild(canvas);

// COLORPICKER
// Schimbare culoare forma
form_color.addEventListener("change", function () {
  let color = form_color.value;
});

// Schimbare culoare stroke
stroke_color.addEventListener("change", function () {
  let color = form_color.value;
});

// ADAUGARE FORME
// Event pentru adaugare linie
button_line.addEventListener("click", function () {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "line");

  form_name.textContent = "Line";

  element.setAttribute("id", ++index);

  element.setAttribute("x1", Math.random() * form_x.value * 100);
  element.setAttribute("y1", Math.random() * form_y.value * 100);

  element.setAttribute("x2", Math.random() * form_x.value);
  element.setAttribute("y2", Math.random() * form_y.value);

  element.setAttribute("stroke", stroke_color.value);
  element.setAttribute("stroke-width", stroke_width.value);

  svg.appendChild(element);
});

// Event pentru adaugare dreptunghi
button_rectangle.addEventListener("click", function () {
  let element = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  form_name.textContent = "Rectangle";

  element.setAttribute("id", ++index);

  element.setAttribute("x", form_x.value);
  element.setAttribute("y", form_y.value);

  element.setAttribute("width", form_width.value);
  element.setAttribute("height", form_height.value);
  element.setAttribute("fill", form_color.value);

  element.setAttribute("stroke", stroke_color.value);
  element.setAttribute("stroke-width", stroke_width.value);

  svg.appendChild(element);
});

// Event pentru adaugare cerc
button_circle.addEventListener("click", function () {
  let element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  form_name.textContent = "Circle";

  element.setAttribute("id", ++index);

  element.setAttribute("cx", form_x.value);
  element.setAttribute("cy", form_y.value);

  element.setAttribute("r", form_width.value);
  element.setAttribute("fill", form_color.value);

  element.setAttribute("stroke", stroke_color.value);
  element.setAttribute("stroke-width", stroke_width.value);

  svg.appendChild(element);
});

// ACTIUNI PE OBIECTELE CREATE
// Selectie
button_select.addEventListener("click", function () {
  let x = 1;

  svg.addEventListener("click", (event) => {

    if (x) {
      if (selected && selected.isSameNode(svg) === false && !(selected.tagName === "rect" && selected.getAttribute("id") == "canvas")) 
        selected.setAttribute("stroke", strokeColor);

      let target = event.target;

      selected = target;
      strokeColor = target.getAttribute("stroke");

      if (selected.isSameNode(svg) === false && !(selected.tagName === "rect" && selected.getAttribute("id") == "canvas")) 
      {
        selected.setAttribute("stroke", "#FAA0A0");

        form_color.addEventListener("change", function () {
          selected.setAttribute("fill", form_color.value);
        });

        stroke_color.addEventListener("change", function () {
          selected.setAttribute("stroke", stroke_color.value);
          strokeColor = stroke_color.value;
        });

        stroke_width.addEventListener("change", function () {
          selected.setAttribute("stroke-width", stroke_width.value);
        });
      }
    }

    if (event.target.isSameNode(svg)) {
      x = 0;
      console.log("nu");
    }
  });
});

// Mutare elemente
// Apasam elementul
svg.addEventListener("mousedown", function (event) {
  moved = event.target;

  initialX = event.offsetX;
  initialY = event.offsetY;

  movedX = +moved.getAttribute("x");
  movedY = +moved.getAttribute("y");

  if (
    !(svg.getAttribute("id") === "canvas") &&
    moved.isSameNode(svg) === false
  ) {
    isMoved = true;

    // Miscam mouse-ul
    window.addEventListener("mousemove", function (event) {
      if (isMoved) {
        moved = event.target;

        let x = event.offsetX;
        let y = event.offsetY;

        if (moved.tagName === "circle") {
          moved.setAttribute("cx", event.offsetX);
          moved.setAttribute("cy", event.offsetY);
        } else if (
          moved.tagName === "rect" &&
          !(moved.getAttribute("id") == "canvas")
        ) {
          moved.setAttribute("x", movedX + x - initialX);
          moved.setAttribute("y", movedY + y - initialY);
        } else if (moved.tagName === "line") {
          moved.setAttribute("x1", movedX + x - initialX);
          moved.setAttribute("y1", movedX + x - initialX);
          moved.setAttribute("x2", movedY + y - initialY);
          moved.setAttribute("y2", movedY + y - initialY);
        }
      }

      // Elementul nu mai este apasat
      svg.addEventListener("mouseup", function () {
        isMoved = false;
      });
    });
  }
});

// Stergere
button_delete.addEventListener("click", function () {
  let x = 1;

  svg.addEventListener("click", (event) => {
    let target = event.target;

    if (
      x === 1 &&
      target.isSameNode(svg) === false &&
      !(target.tagName === "rect" && target.getAttribute("id") == "canvas")
    ) {
      if (target.tagName === "circle") target.remove();
      else if (target.tagName === "rect") target.remove();
      else target.remove();
    }

    if (event.target.isSameNode(svg)) {
      x = 0;
      console.log("nu");
    }
  });
});

// Undo

// Salvare ca svg
button_save.addEventListener("click", () => {
  let link = document.createElement("a");
  document.body.appendChild(link);

  let blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
  link.href = URL.createObjectURL(blob);
  link.download = "masterpiece.svg";
  link.click();
  link.remove();
});

// Salvare ca png
button_export.addEventListener("click", () => {
  const { x, y, width, height } = svg.viewBox.baseVal;
  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const image = document.createElement("img");
  image.src = url;

  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = svg.width;
    canvas.height = svg.height;
    const context = canvas
      .getContext("2d")
      .drawImage(image, x, y, width, height);

    let link = document.createElement("a");
    document.body.appendChild(link);

    link.href = canvas.toDataURL();
    link.download = "masterpiece.png";

    link.click();

    URL.revokeObjectURL(link.href);
  };
});
