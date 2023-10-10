function dijkstra(path = [0, 0], currentCell = [0, 0]) {
  if (currentCell[0] === winPosition[0] && currentCell[1] === winPosition[1]) {
    road = path;
    return;
  }

  if (trueRoad.length !== 0) return;

  currentCell = path[path.length - 1];

  unvis[currentCell[0]][currentCell[1]] = false;

  var neighbors = getNeighborsCanMove(
    grid[currentCell[0]][currentCell[1]],
    unvis
  );

  var stepCanMove = [];

  for (let i = 0; i < neighbors.length; i++) {
    var neighborPosition = neighbors[i];

    if (unvis[neighborPosition[0]][neighborPosition[1]]) {
      switch (neighborPosition[2]) {
        case 0:
          if (
            !gird[currentCell[0]][currentCell[1]].walls[0] &&
            !gird[neighborPosition[0]][neighborPosition[1]].walls[2]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 1:
          if (
            !gird[currentCell[0]][currentCell[1]].walls[1] &&
            !gird[neighborPosition[0]][neighborPosition[1]].walls[3]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 2:
          if (
            !gird[currentCell[0]][currentCell[1]].walls[2] &&
            !gird[neighborPosition[0]][neighborPosition[1]].walls[0]
          )
            stepCanMove.push(neighborPosition);
          break;
        case 3:
          if (
            !gird[currentCell[0]][currentCell[1]].walls[3] &&
            !gird[neighborPosition[0]][neighborPosition[1]].walls[1]
          )
            stepCanMove.push(neighborPosition);
          break;
      }
    }
  }

  if (stepCanMove.length === 0) {
  } else {
    stepCanMove.forEach((neighbor) => {
      dijkstra([...path, neighbor], neighbor);
    });
  }
}
