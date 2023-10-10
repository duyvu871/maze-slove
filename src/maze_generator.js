// Generates a 2d array of Cell objects representing a maze, with dimensions x * y, via a seed (same seed generates same maze)
function mazeDFS(x, y, seed) {
  var randomCounter = 0;

  function getSeededRandom() {
    var rng = new Math.seedrandom(seed + randomCounter);
    randomCounter++;
    return rng();
  }
  // Establish variables and starting grid
  var totalCells = x * y;
  var cells = new Array();
  var unvis = new Array();
  for (var i = 0; i < y; i++) {
    cells[i] = new Array();
    unvis[i] = new Array();
    for (var j = 0; j < x; j++) {
      cells[i][j] = new Cell(i, j);
      unvis[i][j] = true;
    }
  }

  // Set a random position to start from
  var currentCell = [
    Math.floor(getSeededRandom() * y),
    Math.floor(getSeededRandom() * x),
  ];
  var path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  var visited = 1;

  // Loop through all available cell positions
  while (visited < totalCells) {
    // Determine neighboring cells
    var pot = [
      [currentCell[0] - 1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1] + 1, 1, 3],
      [currentCell[0] + 1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1] - 1, 3, 1],
    ];
    var neighbors = new Array();

    // Determine if each neighboring cell is in game grid, and whether it has already been checked
    for (var l = 0; l < 4; l++) {
      if (
        pot[l][0] > -1 &&
        pot[l][0] < y &&
        pot[l][1] > -1 &&
        pot[l][1] < x &&
        unvis[pot[l][0]][pot[l][1]]
      ) {
        neighbors.push(pot[l]);
      }
    }

    // If at least one active neighboring cell has been found
    if (neighbors.length) {
      // Choose one of the neighbors at random
      next = neighbors[Math.floor(getSeededRandom() * neighbors.length)];

      // Remove the wall between the current cell and the chosen neighboring cell
      cells[currentCell[0]][currentCell[1]].walls[next[2]] = false;
      cells[next[0]][next[1]].walls[next[3]] = false;

      // Mark the neighbor as visited, and set it as the current cell
      unvis[next[0]][next[1]] = false;
      visited++;
      currentCell = [next[0], next[1]];
      path.push(currentCell);
    }
    // Otherwise go back up a step and keep going
    else {
      currentCell = path.pop();
    }
  }
  return cells;
}

function mazeDijkstra(x, y, seed) {
  var randomCounter = 0;

  function getSeededRandom() {
    var rng = new Math.seedrandom(seed + randomCounter);
    randomCounter++;
    return rng();
  }
  // Establish variables and starting grid
  var totalCells = x * y;
  var cells = new Array();
  var unvis = new Array();
  for (var i = 0; i < y; i++) {
    cells[i] = new Array();
    unvis[i] = new Array();
    for (var j = 0; j < x; j++) {
      cells[i][j] = new Cell(i, j);
      unvis[i][j] = true;
    }
  }

  // Set a random position to start from
  var currentCell = [
    Math.floor(getSeededRandom() * y),
    Math.floor(getSeededRandom() * x),
  ];
  var path = [currentCell];
  unvis[currentCell[0]][currentCell[1]] = false;
  var visited = 1;

  function dijkstra(currentCell = [0, 0]) {
    if (unvis.indexOf(true) === -1) return;
    if (!currentCell) return;  
    unvis[currentCell[0]][currentCell[1]] = false;
    var neighbors = getNeighborsCanMove(
      cells[currentCell[0]][currentCell[1]],
      unvis
    );

    next = neighbors[Math.floor(getSeededRandom() * neighbors.length)];

    // Remove the wall between the current cell and the chosen neighboring cell
    cells[currentCell[0]][currentCell[1]].walls[next[2]] = false;
    cells[next[0]][next[1]].walls[next[3]] = false;

    var stepCanMove = [];

    for (let i = 0; i < neighbors.length; i++) {
      var neighborPosition = neighbors[i];
      //Check each wall can move

      if (unvis[neighborPosition[0]][neighborPosition[1]]) {
        switch (neighborPosition[2]) {
          case 0:
            if (
              !cells[currentCell[0]][currentCell[1]].walls[0] &&
              !cells[neighborPosition[0]][neighborPosition[1]].walls[2]
            )
              stepCanMove.push(neighborPosition);
            break;
          case 1:
            if (
              !cells[currentCell[0]][currentCell[1]].walls[1] &&
              !cells[neighborPosition[0]][neighborPosition[1]].walls[3]
            )
              stepCanMove.push(neighborPosition);
            break;
          case 2:
            if (
              !cells[currentCell[0]][currentCell[1]].walls[2] &&
              !cells[neighborPosition[0]][neighborPosition[1]].walls[0]
            ) {
              stepCanMove.push(neighborPosition);
            }
            break;
          case 3:
            if (
              !cells[currentCell[0]][currentCell[1]].walls[3] &&
              !cells[neighborPosition[0]][neighborPosition[1]].walls[1]
            )
              stepCanMove.push(neighborPosition);
            break;
        }
      }
    }
    if (stepCanMove.length === 0) {
    } else {
      var randomIndex1 = Math.floor(Math.random() * neighbors.length);
      var randomIndex2 = Math.floor(Math.random() * neighbors.length);

      while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * neighbors.length);
      }

      [neighbors[randomIndex1], neighbors[randomIndex2]].forEach((v) => {
        // path.push(v);
        // console.log(v);
        setTimeout(() => {
          dijkstra(v);
        }, 5);
      });

      //Add current cell to path
    }
  }
 dijkstra()
  console.log(cells);
}
// function dijkstra(path = [[0, 0]], currentCell = [0, 0]) {
//   if (currentCell[0] === winPosition[0] && currentCell[1] === winPosition[1]) {
//   // if (unvis.flat().indexOf(true) === -1) {
//     // trueRoad = path
//     road = path
//     alert("done");
//     roadLoad()
//     // grid = newMaze(totalCols, totalRows, Math.random());
//     // currentPath = [];
//     // unvis = [];
//     // createUnvis()
//     return
//   }
//   if (trueRoad.length !== 0) return
//   // var next;
//   // currentPath.push(currentCell)
//   currentCell = path[path.length - 1]
//   // console.log(currentCell);
//   //Set current cell is visited
//   unvis[currentCell[0]][currentCell[1]] = false;
//   //Find neighbors can move to
//   var neighbors = getNeighborsCanMove(
//     grid[currentCell[0]][currentCell[1]],
//     unvis
//   );

//   var stepCanMove = [];
//   //Check what next neighbors can move
//   for (let i = 0; i < neighbors.length; i++) {
//     var neighborPosition = neighbors[i];
//     //Check each wall can move

//     if (unvis[neighborPosition[0]][neighborPosition[1]]) {
//       switch (neighborPosition[2]) {
//         case 0:
//           if (
//             !grid[currentCell[0]][currentCell[1]].walls[0] &&
//             !grid[neighborPosition[0]][neighborPosition[1]].walls[2]
//           )
//             stepCanMove.push(neighborPosition);
//           break;
//         case 1:
//           if (
//             !grid[currentCell[0]][currentCell[1]].walls[1] &&
//             !grid[neighborPosition[0]][neighborPosition[1]].walls[3]
//           )
//             stepCanMove.push(neighborPosition);
//           break;
//         case 2:
//           if (
//             !grid[currentCell[0]][currentCell[1]].walls[2] &&
//             !grid[neighborPosition[0]][neighborPosition[1]].walls[0]
//           ) {
//             stepCanMove.push(neighborPosition);
//           }
//           break;
//         case 3:
//           if (
//             !grid[currentCell[0]][currentCell[1]].walls[3] &&
//             !grid[neighborPosition[0]][neighborPosition[1]].walls[1]
//           )
//             stepCanMove.push(neighborPosition);
//           break;
//       }
//     }
//   }

//   if (stepCanMove.length === 0) {
    
//   } else {
//     stepCanMove.forEach(v => {
//       // path.push(v);
//       // console.log(v);
//       setTimeout(()=> {
//         dijkstra([...path, v], v)
//       }, 5)
//     });
    
//     //Add current cell to path
//   }
 
//   // setTimeout(() => {
//     // console.log('path: ' + path);
//     // console.log('current: '+currentCell);
//     // console.log("canmove:"+stepCanMove);
//   // }, 100);

// }