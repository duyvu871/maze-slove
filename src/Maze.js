/*
 * GLOBAL VARIABLES
 */

var cols = Number(document.querySelector('#x_cell').value),
  rows = Number(document.querySelector('#y_cell').value); // number of colums and number of rows
var w = Number(document.querySelector('#cell_width').value); // width of a cell in pixels
// var size = 600; // total number of pixels for the canvas
// width = size
// height = size
var winPosition = [
  Number(document.querySelector('#x_point').value) - 1,
  Number(document.querySelector('#y_point').value) - 1
];
var speed = Number(document.querySelector('#speed').value);
var grid = []; // 2d array storing Cell objects for the maze
var mapSeed = Math.random()//0.8584537470696176; // seed of the current maze
var initialised = true; // for setup, ensuring asynchronous execution of draw does not interfere with setup

function getNeighborsCanMove(cell, unvis = []) {
  var neighbors = [];
  var neighborsPosition = [
    [cell.i - 1, cell.j, 0, 2],
    [cell.i, cell.j + 1, 1, 3],
    [cell.i + 1, cell.j, 2, 0],
    [cell.i, cell.j - 1, 3, 1],
  ];

  for (var l = 0; l < 4; l++) {
    if (
      neighborsPosition[l][0] > -1 &&
      neighborsPosition[l][0] < rows &&
      neighborsPosition[l][1] > -1 &&
      neighborsPosition[l][1] < cols &&
      unvis[neighborsPosition[l][0]][neighborsPosition[l][1]]
    ) {
      neighbors.push(neighborsPosition[l]);
    }
  }

  return neighbors;
}

function reloadMaze() {
  grid = mazeDFS(cols, rows, Math.random());
  currentPath = [];
  unvis = [];
  createUnvis()
}

var unvis = new Array();
// totalRows = rows//Math.floor(width/w)
// totalCols = cols//Math.floor(height/w)
for (var i = 0; i < rows; i++) {
  unvis[i] = new Array();
  for (var j = 0; j < cols; j++) {
    unvis[i][j] = true;
  }
}

function createUnvis() {
  for (var i = 0; i < rows; i++) {
    unvis[i] = new Array();
    for (var j = 0; j < cols; j++) {
      unvis[i][j] = true;
    }
  }
}

var road = [];

function roadLoad() {
  for (let i = 0; i < road.length; i++) {
    setTimeout(() => {
      trueRoad.push(road[i])
    }, 10);
  }
}

var currentPath = [];
var trueRoad = []
var winPosition;

function dijkstra(path = [[0, 0]], currentCell = [0, 0]) {
  if (currentCell[0] === winPosition[0] && currentCell[1] === winPosition[1]) {
  // if (unvis.flat().indexOf(true) === -1) {
    // trueRoad = path
    road = path
    // alert("done");
    roadLoad()
    // grid = newMaze(totalCols, totalRows, Math.random());
    // currentPath = [];
    // unvis = [];
    // createUnvis()
    return
  }
  if (road.length !== 0) return
  // var next;
  // currentPath.push(currentCell)
  currentCell = path[path.length - 1]
  // console.log(currentCell);
  //Set current cell is visited
  unvis[currentCell[0]][currentCell[1]] = false;
  //Find neighbors can move to
  var neighbors = getNeighborsCanMove(
    grid[currentCell[0]][currentCell[1]],
    unvis
  );

  var stepCanMove = [];
  //Check what next neighbors can move
  for (let i = 0; i < neighbors.length; i++) {
    var neighborPosition = neighbors[i];
    //Check each wall can move

    if (unvis[neighborPosition[0]][neighborPosition[1]]) {
      switch (neighborPosition[2]) {
        case 0:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[0] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[2]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 1:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[1] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[3]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 2:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[2] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[0]
          ) {
            stepCanMove.push(neighborPosition);
          }
          break;
        case 3:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[3] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[1]
          )
            stepCanMove.push(neighborPosition);
          break;
      }
    }
  }

  if (stepCanMove.length === 0) {
    
  } else {
    stepCanMove.forEach(v => {
      // path.push(v);
      // console.log(v);
      setTimeout(()=> {
        dijkstra([...path, v], v)
      }, speed)
    });
    
    //Add current cell to path
  }
 
  // setTimeout(() => {
    // console.log('path: ' + path);
    // console.log('current: '+currentCell);
    // console.log("canmove:"+stepCanMove);
  // }, 100);

}


function solve(path = [[0, 0]], currentCell = [0, 0]) {
  if (currentCell[0] === winPosition[0] && currentCell[1] === winPosition[1]) {
  // if (unvis.flat().indexOf(true) === -1) {
    alert("done");
    // grid = newMaze(totalCols, totalRows, Math.random());
    // currentPath = [];
    // unvis = [];
    // createUnvis()
    return
  }
  var next;
  currentPath = path;
  currentCell = path[path.length - 1];

  //Set current cell is visited
  unvis[currentCell[0]][currentCell[1]] = false;
  //Find neighbors can move to
  var neighbors = getNeighborsCanMove(
    grid[currentCell[0]][currentCell[1]],
    unvis
  );

  var stepCanMove = [];
  //Check what next neighbors can move
  for (let i = 0; i < neighbors.length; i++) {
    var neighborPosition = neighbors[i];
    //Check each wall can move

    if (unvis[neighborPosition[0]][neighborPosition[1]]) {
      switch (neighborPosition[2]) {
        case 0:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[0] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[2]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 1:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[1] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[3]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 2:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[2] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[0]
          ) {
            stepCanMove.push(neighborPosition);
          }
          break;
        case 3:
          if (
            !grid[currentCell[0]][currentCell[1]].walls[3] &&
            !grid[neighborPosition[0]][neighborPosition[1]].walls[1]
          )
            stepCanMove.push(neighborPosition);
          break;
      }
    }
  }

  if (stepCanMove.length === 0) {
    path.pop();
  } else {
    next = stepCanMove[Math.floor(Math.random() * stepCanMove.length)];

    //Add current cell to path
    path.push(next);
  }
 
  setTimeout(() => {
    // console.log('path: ' + path);
    // console.log('current: '+currentCell);
    // console.log("canmove:"+stepCanMove);
    solve(path, next, unvis)
  }, speed);

}
/*
 * CLASS FUNCTIONS
 */

// Cell object storing its (x,y) position and its surrounding walls
function Cell(i, j) {
  this.i = i; // row
  this.j = j; // column
  this.walls = [true, true, true, true]; // walls surrounding cell (top, right, bottom, left)
  this.visited = false;
  this.isDeadCell = false;
  // (x,y) coordinates of the top left of the cell (in pixels)
  var y = i * w;
  var x = j * w;

  // (x,y) coordinates of the corners of the cell (top left, top right, bottom left, bottom right)
  var tL = [x, y];
  var tR = [x + w, y];
  var bR = [x + w, y + w];
  var bL = [x, y + w];
  this.tick = function (type) {
    fill(255, 0, 0)
    strokeWeight(0)
    rect( x + w*0.25,  y + w*0.25, w -w*0.5, w -w*0.5)
  }
  this.highlight = function (type) {
    fill(0, 255, 9)
    strokeWeight(0)
    rect( x + w*0.25,  y + w*0.25, w -w*0.5, w -w*0.5)
  }
  // Draws the cell to the screen by drawing lines between the corners of the cell if a wall exists there
  this.show = function () {
    // stroke(255,255, 255);
   
    strokeWeight(w*0.09)
    if (this.walls[0]) {
      // if north wall exists, draw line between top left and top right corners
      line(tL[0], tL[1], tR[0], tR[1]);
    }
    if (this.walls[1]) {
      // if east wall exists, draw line between top right and bottom right corners
      line(tR[0], tR[1], bR[0], bR[1]);
    }
    if (this.walls[2]) {
      // if south wall exists, draw line between bottom left and bottom right corners
      line(bL[0], bL[1], bR[0], bR[1]);
    }
    if (this.walls[3]) {
      // if west wall exists, draw line between top left and bottom left corners
      line(tL[0], tL[1], bL[0], bL[1]);
    }
    stroke(255);
  };
}


// p5.js setup function which is called once after initialising the script
function setup() {

  // Setup the canvas, of size provided by global
  // createCanvas(size, size);
  createCanvas(cols*w, rows*w);

  // Number of columns in maze grid
  // cols = floor(width / w);
  // Number of rows in maze grid
  // rows = floor(height / w);
  // Create grid of cell for maze
  grid = mazeDFS(cols, rows, mapSeed);
  // Define win point
  // winPosition = [grid[0].length - 1, grid.length - 1];
}

// p5.js draw function (executed continuously)
function draw() {
  // Since draw is asynchronously called with setup, we check if the game has been initialised yet (initialised is set true after setup finishes). If not, we leave the method.
  if (!initialised) {
    return;
  }
  background(0); // set background of canvas to dark grey
  // Iterate over each cell object in the 2d array of cell objects, and call their show function to draw them to the canvas
  for (var i = 0; i < rows; i++) {
    // console.log(1);
    for (var j = 0; j < cols; j++) {
      grid[i][j].show();
      // grid[i][j].tick()
      if (!unvis[i][j]) grid[i][j].tick()
      // console.log(i +  ' ' + j);
    }
  }
  // Highlight current path
  for (let n = 0; n < currentPath.length; n++) {
      grid[currentPath[n][0]][currentPath[n][1]].highlight(currentPath[n][3])  
  }

  for (let n = 0; n < trueRoad.length; n++) {
    grid[trueRoad[n][0]][trueRoad[n][1]].highlight()
  }
  // Now fill in the bottom right cell with the golden square for victory
  fill(255, 255, 0);
  rect((winPosition[0]) * w + 0.2 * w, (winPosition[1]) * w + 0.2 * w, 0.6 * w, 0.6 * w);
}

// p5.js keyPressed event function, which is called whenever a key is pressed
// function keyPressed() {
//   // Obtain the walls surrounding the player, by obtaining the cell at its location and obtaining its walls array
//   var walls = grid[player.j][player.i].walls;
//   // If up arrow was pressed and there is no north wall then modify the player's location one cell north and update their location in the database
//   if (keyCode === UP_ARROW) {
//     if (!walls[0]) {
//       player.j--;
//       // updatePlayer();
//     }
//     // If right arrow was pressed and there is no east wall then modify the player's location one cell east and update their location in the database
//   } else if (keyCode === RIGHT_ARROW) {
//     if (!walls[1]) {
//       player.i++;
//       // updatePlayer();
//     }
//     // If down arrow was pressed and there is no south wall then modify the player's location one cell south and update their location in the database
//   } else if (keyCode === DOWN_ARROW) {
//     if (!walls[2]) {
//       player.j++;
//       // updatePlayer();
//     }
//     // If west arrow was pressed and there is no west wall then modify the player's location one cell west and update their location in the database
//   } else if (keyCode === LEFT_ARROW) {
//     if (!walls[3]) {
//       player.i--;
//       // updatePlayer();
//     }
//   }
//   player.show();
//   // If the player's location is at the bottom right cell then they have won, so reset the seed in the database and alert a win message.
//   // ** An event for the seed change shall be generated, which will call a function to reset the maze.
//   if (player.i == cols - 1 && player.j == rows - 1) {
//     alert("Player " + player.displayName + " (YOU) won!");
//   }
// }

function updateControl(id, value) {
  // console.log(id);
  switch (id) {
    case 'x_cell':
      // console.log('ok');
      cols = Number(document.querySelector('#x_cell').value);
      break;
    case 'y_cell':
      rows = Number(document.querySelector('#y_cell').value);
      break;
    case 'cell_width': 
      w = Number(document.querySelector('#y_cell').value);
      break;
    case 'speed':
      speed = Number(document.querySelector('#speed').value);
      break;
    case 'x_point':
      winPosition[0] = Number(document.querySelector('#x_point').value);
      break;
    case 'y_point':
      winPosition[1] = Number(document.querySelector('#y_point').value);
      break;
    default:
      break;
  }

}

// [...document.querySelectorAll('.option input')].forEach(element => {
//   element.addEventListener('input', (e) => {
//     var id = e.target.id;
//     // console.log(id);
//     updateControl(id);
//   })
// })

document.querySelector('.save_control button').addEventListener('click', (e) => {
  win_x = Number(document.querySelector('#x_point').value);
  win_y = Number(document.querySelector('#y_point').value);
  
  cols = Number(document.querySelector('#x_cell').value);
  rows = Number(document.querySelector('#y_cell').value);
  w = Number(document.querySelector('#cell_width').value);
  speed = Number(document.querySelector('#speed').value);
  
  winPosition[0] = Number(document.querySelector('#x_point').value);
  winPosition[1] = Number(document.querySelector('#y_point').value);
  reloadMaze();
  createCanvas(cols*w, rows*w);
  trueRoad = [];
  currentPath = [];
})

document.querySelector(".run-maze").addEventListener("click", (e) => {
  dijkstra();
});

// var cols = Number(document.querySelector('#x_cell').value),
//   rows = Number(document.querySelector('#y_cell').value); // number of colums and number of rows
// var rows = Number(document.querySelector('#y_cell').value); // width of a cell in pixels
// // var size = 600; // total number of pixels for the canvas
// // width = size
// // height = size
// var winPosition = [
//   Number(document.querySelector('#x_point').value),
//   Number(document.querySelector('#y_point').value)
// ];
// var speed = Number(document.querySelector('#speed').value);


