// VALUES
let gridSize = 16;
let selectedColor = 'red';
let gridOn = false;

// SELECTORS
const grid = document.querySelector('#grid');
const buttons = document.querySelectorAll('button');
const btns = document.querySelectorAll('.btn');
const toggle = document.querySelector('.toggle');
const clear = document.querySelector('.clear');
const slider = document.querySelector('#myRange');
const gridInfo = document.querySelector('#value');

// CREATE GRID
function createGrid() {
  gridInfo.textContent = `${slider.value} x ${slider.value}`; // grid size info
  grid.textContent = ''; // reset grid

  for (let col = 0; col < gridSize; col += 1) {
    const column = document.createElement('div');
    column.classList.add('column');
    column.id = `column-${col + 1}`;
    document.querySelector('#grid').appendChild(column);
  }
  for (let i = 0; i < gridSize; i += 1) {
    for (let row = 0; row < gridSize; row += 1) {
      const createPixel = document.createElement('div');
      gridOn ? createPixel.classList.add('pixel', 'toggle') : createPixel.classList.add('pixel');
      document.querySelector(`#column-${row + 1}`).appendChild(createPixel);
    }
  }
}

// PICK COLOR, MARK ACTIVE BUTTON, BUTTON PUSH ANIMATION
function pickColor() {
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      selectedColor = e.target.textContent.toLowerCase();
      btns.forEach((btnStatus) => {
        btnStatus.classList.remove('active');
        e.target.classList.add('active');
      });
    });
  });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.add('buttonPushed');
      button.addEventListener('mouseleave', () => {
        button.classList.remove('buttonPushed');
      });
    });
  });
}

// RANDOM COLOR GENERATOR
function rgb() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

// DRAWING
function updatePixel(item) {
  const pixel = item;
  pixel.classList.remove('red', 'green', 'blue', 'yellow', 'black', 'eraser');

  if (selectedColor === 'rainbow') {
    pixel.style.backgroundColor = rgb();
  } else {
    pixel.classList.add(selectedColor);
    pixel.removeAttribute('style');
  }
}

function drawing() {
  let down = false;

  grid.addEventListener('mousedown', (e) => {
    down = true;
    e.preventDefault();
  });

  document.addEventListener('mouseup', () => {
    down = false;
  });

  const items = document.querySelectorAll('.pixel');
  items.forEach((item) => {
    item.addEventListener('mousedown', () => {
      updatePixel(item);
    });
    item.addEventListener('mouseover', () => {
      if (down) {
        updatePixel(item);
      }
    });
  });
}

// TOGGLE GRID
toggle.addEventListener('click', () => {
  const items = document.querySelectorAll('.pixel');
  items.forEach((item) => {
    item.classList.toggle('toggle');
    item.classList.contains('toggle') ? gridOn = true : gridOn = false;
  });
});

function clearGrid() {
  const items = document.querySelectorAll('.pixel');
  items.forEach((item) => {
    if (item.classList.contains('toggle')) {
      item.className = ('pixel toggle'),
        item.removeAttribute('style')
    } else {
      item.className = ('pixel');
      item.removeAttribute('style');
    }
  });
}

// CLEAR GRID
clear.addEventListener('click', clearGrid);

// RUN
function run() {
  createGrid();
  pickColor();
  drawing();
}

// CHANGE GRID SIZE
slider.oninput = function setGridSize() {
  gridInfo.textContent = `${this.value} x ${this.value}`;
  gridSize = this.value;
};

slider.addEventListener('click', run);
slider.addEventListener('touchend', run);
slider.addEventListener('keydown', (e) => {
  if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) {
    run();
  }
});

// START PROGRAM
run();