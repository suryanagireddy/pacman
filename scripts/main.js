//-------------------------------------------------------------
// Game configuration data
//-------------------------------------------------------------

// This is a numerical representation of the pacman game.
// It uses numbers to represent walls, coins, empty space, and pacman.
let gameData = [
  [1,1,1,1,1,1,1],
  [1,3,3,3,3,3,1],
  [1,3,3,3,3,3,1],
  [1,3,3,3,3,3,1],
  [1,3,3,3,3,3,1],
  [1,5,3,3,3,3,1],
  [1,1,1,1,1,1,1]
];

// Specifically, a wall is represented by the number 1,
// a coin is the number 2, empty ground is the number 3,
// and Pacman is the number 5.


// In our code below, we want to be able to refer to names of things,
// and not numbers. To make that possible, we set up a few labels.
const WALL   = 1;
const GROUND = 3;
const PACMAN = 5;


// We will use the identifier "map" to refer to the game map.
// We won't assign this until later on, when we generate it
// using the gameData.
let map;

// We need to keep track of Pacman's location on the game board.
// That is done through a pair of coordinates.
// And, we will keep track of what direction she is facing.
let pacman = {
  x: 1,
  y: 5,
  direction: 'east'
};


//-------------------------------------------------------------
// Game map creation functions
//-------------------------------------------------------------
// This function converts gameData into DOM elements.
function createTiles(data) {

  // We'll keep the DOM elements in an array.
  let tilesArray = [];

  // Let's take one row at a time...
  for (let row of data) {

    // Then look at each column in that row.
    for (let col of row) {

      // We create a game tile as a div element.
      let tile = document.createElement('div');

      // We assign every tile the class name tile.
      tile.classList.add('tile');

      // Now, depending on the numerical value,
      // we need to add a more specific class.
      if (col === WALL) {
        tile.classList.add('wall');

      } else if (col === GROUND) {
        tile.classList.add('ground');

      } else if (col === PACMAN) {
        tile.classList.add('pacman');

        // For Pacman, we will add yet another
        // class for the direction pacman is facing.
        tile.classList.add(pacman.direction);

      }

      // Now that our individual tile is configured,
      // we add it to the tilesArray.
      tilesArray.push(tile);
    }

    // Once we reach the end of a row, we create a br element,
    // which tells the browser to create a line break on the page.
    let brTile = document.createElement('br');

    // We then add that br element to the tilesArray.
    tilesArray.push(brTile);
  }

  // At the end of our function, we return the array
  // of configured tiles.
  return tilesArray;
}

// This function creates a map element, fills it with tiles,
// and adds it to the page.
function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(gameData);
  for (let tile of tiles) {
    map.appendChild(tile);
  }

  document.body.appendChild(map);
}

// This function removes the map element from the page.
function eraseMap() {
  document.body.removeChild(map);
}

//-------------------------------------------------------------
// Movement functions
//-------------------------------------------------------------

// Each function does the following:
// - set pacman's direction so that we show the correct image
// - check to see if we hit a wall
// - if we didn't hit a wall, set pacman's old location to empty space
// - update pacman's location
// - draw pacman in the new location

function moveanticlock() {
  if (pacman.direction == 'east'){
    pacman.direction = 'north';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'north'){
    pacman.direction = 'west';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'west'){
    pacman.direction = 'south';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'south'){
    pacman.direction = 'east';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
}

function moveclock() {
  if (pacman.direction == 'east'){
    pacman.direction = 'south';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'south'){
    pacman.direction = 'west';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'west'){
    pacman.direction = 'north';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'north'){
    pacman.direction = 'east';
    gameData[pacman.y][pacman.x] = PACMAN;
  }

}

function moveUp() {
  
    if(pacman.direction == 'east'){
       if(gameData[pacman.y][pacman.x+1] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.x = pacman.x + 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }  
    if(pacman.direction == 'north'){
      if (gameData[pacman.y-1][pacman.x] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.y = pacman.y - 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }
    else if(pacman.direction == 'west'){
      if (gameData[pacman.y][pacman.x-1] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.x = pacman.x - 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }
    else if(pacman.direction == 'south'){
      if (gameData[pacman.y+1][pacman.x] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.y = pacman.y + 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }
}

// This function sets up the listener for the whole page.
// Specifically, when the user presses a key, we run a function
// that handles that key press.
function setupKeyboardControls() {
  document.addEventListener('keydown', function (e) {

    // As far as the browser is concerned, each key on the keyboard
    // is associated with a numeric value.
    // After some experimenting, you can discover which numeric values
    // correspond to the arrow keys.

    // Each time the user moves, we recalculate Pacman's location,
    // update the
    if (e.keyCode === 37) {         // left arrow is 37
      moveanticlock();

    } else if (e.keyCode === 38) {  // up arrow is 38
      moveUp();

    } else if (e.keyCode === 39){   // right arrow is 39
      moveclock();
    }

    // After every move, we erase the map and redraw it.
    eraseMap();
    drawMap();
  });
}

//-------------------------------------------------------------
// Main game setup function
//-------------------------------------------------------------
function main() {
  // Initialize the game by drawing the map and setting up the
  // keyboard controls.
  drawMap();
  setupKeyboardControls();   
}

// report the position of the pacman position

var reportBut = document.getElementById("reportBut");

reportBut.addEventListener("click", Report);
function Report() {
    
    var direc = pacman.direction;
    
    if (pacman.y == 5)
        {
            var xcord = pacman.x-1;
            var ycord = 0;
        }
    
     else if (pacman.y == 4)
        {
            var xcord = pacman.x-1;
            var ycord = 1;
        }
    else if (pacman.y == 3)
        {
            var xcord = pacman.x-1;
            var ycord = 2;
        }
    
    else if (pacman.y == 2)
        {
            var xcord = pacman.x-1;
            var ycord = 3;
        }
    else if (pacman.y == 1)
        {
            var xcord = pacman.x-1;
            var ycord = 4;
        }
    
    document.getElementById("xcordinate").innerHTML = xcord;
    document.getElementById("ycordinate").innerHTML = ycord;
    document.getElementById("pacdirection").innerHTML = direc;
    
}

//start the game.

var mixBut = document.getElementById("mixBut");

mixBut.addEventListener("click", Place);

function Place(){
    main();
    
    document.getElementById("reportBut").disabled = false;
    document.getElementById("moveBut").disabled = false;
    document.getElementById("leftBut").disabled = false;
    document.getElementById("rightBut").disabled = false;
    
    mixBut.removeEventListener("click", Place);
    mixBut.addEventListener("click", Stop);
    mixBut.value = "Stop";
}

function Stop(){
    document.location.reload();
    
    mixBut.removeEventListener("click", Stop);
    mixBut.addEventListener("click", Place);
    mixBut.value = "Place";
}


// Pacman moving functions with button clicks

var moveBut = document.getElementById("moveBut");

moveBut.addEventListener("click", Move);

function Move() {
  
    if(pacman.direction == 'east'){
       if(gameData[pacman.y][pacman.x+1] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.x = pacman.x + 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }  
    if(pacman.direction == 'north'){
      if (gameData[pacman.y-1][pacman.x] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.y = pacman.y - 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }
    else if(pacman.direction == 'west'){
      if (gameData[pacman.y][pacman.x-1] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.x = pacman.x - 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }
    else if(pacman.direction == 'south'){
      if (gameData[pacman.y+1][pacman.x] !== WALL) {
      gameData[pacman.y][pacman.x] = GROUND;
      pacman.y = pacman.y + 1;
      gameData[pacman.y][pacman.x] = PACMAN;
    }
  }
    
    eraseMap();
    drawMap();
}

var leftBut = document.getElementById("leftBut");

leftBut.addEventListener("click", Left);

function Left() {
  if (pacman.direction == 'east'){
    pacman.direction = 'north';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'north'){
    pacman.direction = 'west';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'west'){
    pacman.direction = 'south';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'south'){
    pacman.direction = 'east';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
    eraseMap();
    drawMap();
}

var rightBut = document.getElementById("rightBut");

rightBut.addEventListener("click", Right);

function Right() {
  if (pacman.direction == 'east'){
    pacman.direction = 'south';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'south'){
    pacman.direction = 'west';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'west'){
    pacman.direction = 'north';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  else if (pacman.direction == 'north'){
    pacman.direction = 'east';
    gameData[pacman.y][pacman.x] = PACMAN;
  }
  eraseMap();
  drawMap();     

}







