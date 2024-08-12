// Direction array to facilitate grid traversal — 4 connected directions.
const directions: number[] = [-1, 0, 1, 0, -1];

// Variables to store grid dimensions.
let rows: number;
let cols: number;

// Function that returns the minimum number of days to isolate part of the grid.
function minDays(grid: number[][]): number {
    // Initialize the dimensions.
    rows = grid.length;
    cols = grid[0].length;
  
    // Check if the grid is already disconnected or not connected at all.
    if (countIslands(grid) !== 1) {
        return 0;  // No day required to isolate if the grid is originally not connected.
    }
  
    // Attempt removing each land piece to check if it can isolate an area.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // If the current cell is land.
            if (grid[i][j] === 1) {
                grid[i][j] = 0;  // Temporarily remove the land piece.
                // Check if removing this piece results in disconnection.
                if (countIslands(grid) !== 1) {
                    return 1;  // Only 1 day required to isolate.
                }
                grid[i][j] = 1;  // Restore the land piece after check.
            }
        }
    }
  
    // If no single piece removal leads to isolation, return 2 days.
    return 2;
}

// Helper function to count the number of islands (distinct connected components).
function countIslands(grid: number[][]): number {
    let islandCount = 0;
    // Iterate over the grid to find starting points of islands.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // If a cell is land, start DFS.
            if (grid[i][j] === 1) {
                dfs(i, j, grid);
                islandCount++;  // Increment island count after a complete DFS.
            }
        }
    }
    // Reset the grid to its original state after counting.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) {
                grid[i][j] = 1;  // Reset from temporary state (2) back to land (1).
            }
        }
    }
    return islandCount;  // Return the total count of islands.
}

// Depth-first search to mark all cells of a single connected component.
function dfs(row: number, col: number, grid: number[][]): void {
    grid[row][col] = 2;  // Temporarily mark the cell as part of this island.
    // Explore all four connected directions.
    for (let k = 0; k < 4; k++) {
        let newRow = row + directions[k];
        let newCol = col + directions[k + 1];
      
        // If the adjacent cell is within bounds and is land, continue DFS.
        if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            grid[newRow][newCol] === 1
        ) {
            dfs(newRow, newCol, grid);
        }
    }
}