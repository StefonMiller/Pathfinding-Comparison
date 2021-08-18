
/**
 * Class representing cells for the A* algorithm
 */
class aStarCell 
{
    /**
     * Constructor
     * @param {} cellX x coordinate of the cell 
     * @param {*} cellY y coordinate of the cell
     * @param {*} endX end x coordinate
     * @param {*} endY end y coordinate
     */
    constructor(cellX, cellY, endX, endY) 
    {
        //Assign the object's x, y, g, h, and f values
        this.x = cellX;
        this.y = cellY;
        this.g = 0;
        this.f = 0;
        //Calculate h using the manhattan distance from the cell's position to the end
        this.h = Math.abs(cellX - endX) + Math.abs(cellY - endY);
        //Initialize parent to null
        this.parent = null;
    }
  }

/**
 * Utilizes the A* algorithm to find the exit
 * @param {} startX starting x coordinate
 * @param {*} startY starting y coordinate
 * @param {*} endX ending x coordinate
 * @param {*} endY ending y coordinate
 * @param {*} time time to wait between iterations
 * @returns 
 */
async function astar(startX, startY, endX, endY, time)
{
    //Initialize references to maze HTML elements
    let maze = document.getElementsByClassName("mazeDiv")[2];
    let mazeTable = maze.getElementsByTagName("table")[0];
    let counter = maze.getElementsByTagName("h4")[0];

    //Initialize step counter for the algorithm
    if(typeof astar.steps == 'undefined') 
    {
       astar.steps = 0;
    }

    //Populate a 2D array of cells
    cells = initCells(endX, endY, mazeTable.rows.length, mazeTable.rows[0].cells.length);

    
    //Create an open and closed list. Populate the open list with the starting cell
    let open = [cells[startX][startY]];
    let closed = [];

    //Loop until either the open array is empty or we find an exit
    while(open.length != 0)
    {
        //For each cell evaluated, increment the steps variable
        astar.steps++;
        counter.innerHTML = "Cells checked: " + astar.steps;

        // Get the index of the cell with the lowest f value in the open list
        let bestIndex = 0;
        for(i = 0; i < open.length; i++) 
        {
            if(open[i].f < open[bestIndex].f)
            {
                bestIndex = i;
            }
        }
        //Store the best cell in the open array
        let bestCell = open[bestIndex];

        // Check if the cell we just retrieved is the ending cell
        if(bestCell.x == endX && bestCell.y == endY) 
        {
            //If we are at the end, populate an array with the path from start to exit
            let currCell = bestCell;
            let path = [];
            while(currCell.parent) 
            {
                path.push(currCell);
                currCell = currCell.parent;
            }
    
            //Traverse the path in reverse order and change the cell colors with a delay in between
            for(let i = path.length - 1; i > 0; i--)
            {
                if(!mazeTable.rows[path[i].y].cells[path[i].x].classList.contains("end"))
                {
                    mazeTable.rows[path[i].y].cells[path[i].x].classList.add("sol");
                }
                await sleep(time);
            }
            //Exit function once finished
            return;
        }

        //If we are not at the end, remove the best node from the open list and add it to the closed list
        open.splice(bestIndex, 1);
        closed.push(bestCell);

        //Get all neighbors of the current cell and loop through them
        let neighbors = getNeighbors(bestCell.x, bestCell.y, cells, mazeTable);
        for(let i = 0; i < neighbors.length; i++) 
        {
            //Don't evaluate the current enighbor if it is already in the closed list
            let currNeighbor = neighbors[i];
            if(closed.includes(currNeighbor)) 
            {
                continue;
            }
    
            // Set the current g value to the g value of the neighbor + 1 to account for traversal to the next cell
            let gScore = bestCell.g + 1; 
            let gScoreIsBest = false;
    
            
            //If the current neighbor isn't in the open list, then it has the best g value so we can add it to the open list
            if(!open.includes(currNeighbor)) 
            {
                gScoreIsBest = true;
                open.push(currNeighbor);
            }
            //Check if the current neighbor was previously evaluated with a higher g score
            else if(gScore < currNeighbor.g) 
            {
                gScoreIsBest = true;
            }
            
            //If the path currently optimal, set the parent, g value, and f value of the current neighbor
            if(gScoreIsBest) 
            {
                currNeighbor.parent = bestCell;
                currNeighbor.g = gScore;
                currNeighbor.f = currNeighbor.g + currNeighbor.h;
            }
        }
    }
    // If no path was found, return an empty array. This should never happen by Eller's algorithm
    return [];
}

/**
 * Populates a 2D array of cells representing the maze 
 * @param {} endX end x coordinate
 * @param {*} endY end y coordinate
 * @param {*} height # of rows in the maze
 * @param {*} width # of cells per row
 * @returns 2D array populated with aStarCell objects
 */
function initCells(endX, endY, height, width)
{
    let tempCells = [];
    //Loop through and populate each coordinate in the 2D array with an object
    for(i = 0; i < height; i++)
    {
        tempCells[i] = [];
        for(j = 0; j < width; j++)
        {
            tempCells[i][j] = new aStarCell(i, j, endX, endY);
        }
    }
    return tempCells;
}

/**
 * Returns all valid neighbors of a starting cell
 * @param {*} x starting x coordinate
 * @param {*} y  starting y coordinate
 * @param {*} cells 2D array of aStarCell objects
 * @param {*} mazeTable HTML table element
 * @returns array of aStarCells which are the neighbors of the cell at y,x
 */
function getNeighbors(x, y, cells, mazeTable)
{
    let n = [];
    //Only add cells to the array if they are within boundaries and not blocked by a wall
    if((x != mazeTable.rows[y].cells.length - 1) &&  (!mazeTable.rows[y].cells[x].classList.contains("right")))
    {
        n.push(cells[x + 1][y]);

    }
    if((x != 0)  && (!mazeTable.rows[y].cells[x-1].classList.contains("right")))
    {
        n.push(cells[x - 1][y]);
    }
    if((y != mazeTable.rows.length - 1) && (!mazeTable.rows[y].cells[x].classList.contains("bottom")))
    { 
        n.push(cells[x][y + 1]);

    }
    if((y != 0) && (!mazeTable.rows[y-1].cells[x].classList.contains("bottom")))
    {
        n.push(cells[x][y - 1]);
    }
    
    return n;
}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}