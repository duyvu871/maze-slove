function movement(e) {
    var walls = grid[player.j][player.i].walls;
    var code = e.target.getAttribute('data-key')
    // Checks the active keys code and checks if it is a valid input, if not then nothing will happen.
    switch(code) {
        case 'ArrowUp':
        case 'KeyW':
            // Fetches the relevant neighbouring cell, using the index function
           
            // Checks to see if the relevant walls for both the current and new positions are false
            if(!walls[0]) {
                player.j--;
                updatePlayer();
            }
            break;
        case 'ArrowRight':
        case 'KeyD':

            if (!walls[1]) {
                player.i++;
                updatePlayer();
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (!walls[2]) {
                player.j++;
                updatePlayer();
            }
            break;
        case 'ArrowLeft':
        case 'KeyA':
            if (!walls[3]) {
                player.i--;
                updatePlayer();
            }
            break;
    }

};
