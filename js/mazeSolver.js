window.onload = init;
var startingX = 0;
var startingY = 0;
var endingX = 0;
var endingY = 0;
var newSetNum;

/**
 * Validates form data
 */
function validate()
{
    bfs.steps = 0;
    dfs.steps = 0;
    astar.steps = 0;
    //Get x and y dimensions for the grid from the doc and parse them to integers
    let xDim = document.getElementById("xDim");
    let yDim = document.getElementById("yDim");
    let delay = document.getElementById("delay");
    let x = parseInt(xDim.value, 10);
    let y = parseInt(yDim.value, 10);
    let time = parseInt(delay.value, 10);
    xDim.value = "";
    yDim.value = "";
    time.value = "";

    //Ensure data is an integer and between certain boundaries for the maze
    if(x == "" || y == "")
    {
        alert("Please fill all fields");
        return;

    }
    if(time == "")
    {
        time = 200;
    }
    if(Number.isInteger(x) && Number.isInteger(y))
    {
        if((10 <= x && x <= 35) && (10 <= y && y <= 100))
        {
            initMazes(x, y);
            fillMazes(x, y);
            dfs(startingX, startingY, time);
            bfs(startingX, startingY, time);
        }
        else
        {
            alert("Please enter a number between 10 and 35 for the width and a number between 10 and 100 for the height");
        }
        
    }
    else
    {
        alert("Please enter an integer for height and width fields");
        return;
    }


}

/**
 * Create an event listener for the start button
 */
function init(){
    document.getElementById("start").onclick = validate;
    //Render the border of a 10x10 maze by default
    initMazes(10, 10);
}

/**
 * Create the rows for the maaze
 * @param {} y number of vertical cells in the maze
 */
function initMazes(x, y)
{
    let mazes = document.getElementsByClassName("mazeDiv");
    for(maze of mazes)
    {
        //For each maze, create a new tbody and fill it with new cells
        let new_tbody = document.createElement('tbody')
        for(i = 0; i < y; i++)
        {
            new_tbody.insertRow();
            for(j = 0; j < x; j++)
            {
                new_tbody.rows[i].insertCell();
            }


        }
        //Replace the old tbody with the new one to avoid just adding cells onto the same maze
        let old_tbody = maze.getElementsByTagName("tbody")[0];
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
        
    }
}

/**
 * Creates the maze itself to be used by all tables
 * @param {} x width of maze
 * @param {*} y height of maze
 */
function fillMazes(x, y)
{
    finishedTable = generateMaze(x);
    //Remove the set numbers from the table
    for(let i = 0; i < finishedTable.rows.length; i++)
    {
        for(let j = 0; j < finishedTable.rows[i].cells.length; j++)
        {
            finishedTable.rows[i].cells[j].innerHTML = "";
        }
    }
    //Create the start and end points for the maze randomly
    finishedTable = generateOutsidePoints(x, y, finishedTable);
    let mazes = document.getElementsByClassName("mazeDiv");
    //Propogate the maze to all tables
    for(maze of mazes)
    {
        let newTable = finishedTable.cloneNode(true);
        let old_table = maze.getElementsByTagName("table")[0];
        old_table.parentNode.replaceChild(newTable, old_table);
    }
    
}


/**
 * Generates a maze using Eller's algorithm
 * @param x: Number of cells per row
 */
function generateMaze(x)
{
    
    let maze = document.getElementsByClassName("mazeDiv")[0];
    let currTBody = document.getElementsByTagName("tbody")[0];
    newSetNum = 1;
    let sets = [];
    let currTable = maze.getElementsByTagName("table")[0];
    for(let i = 0; i < currTable.rows.length; i++)
    {
        //Initialize first row with all different sets
        if(i == 0)
        {
            for(let j = 0; j < x; j++)
            {
                sets.push(newSetNum);
                currTable.rows[i].cells[j].innerHTML = newSetNum;
                newSetNum++;
            }
        }
        //If we are at the last row, create the row normally but join all cells in different sets
        if(i == currTable.rows.length - 1)
        {
            sets = randHorizontalJoin(sets, currTable.rows[i]);
            endHorizontalJoin(currTable.rows[i]);
            return currTable;
        }
        //For each row except the last, perform a horizontal and then vertical join randomly
        sets = randHorizontalJoin(sets, currTable.rows[i]);
        sets = randVerticalJoin(sets, currTable, i, newSetNum);
    }
    
    
}

/**
 * Removes walls from cells of different sets in the last row
 * @param {} endRow 
 */
function endHorizontalJoin(endRow)
{
    for(let i = 0; i < endRow.cells.length - 1; i++)
    {
        //If cells are in different sets, remove the wall between them
        if(endRow.cells[i].innerHTML != endRow.cells[i+1].innerHTML)
        {
            endRow.cells[i].classList.remove("right");
        }
    }
}

/**
 * Randomly joins cells in a row to cells in the next row. At least 1 cell in each set should have a vertical join
 * @param {} sets array representing the current row
 * @param currTable reference to the table being worked on
 * @param rowNum current row index
 * @return the next row to work on
 */
function randVerticalJoin(sets, currTable, rowNum)
{
    let finished = {};
    //Populate dictionary indicating whether or not a set has a vertical join yet
    let uniqueSets = [...new Set(sets)];
    for(let i = 0; i < uniqueSets.length; i++)
    {
        finished[uniqueSets[i]] = false;
        //Get all indices of the current unique set in the row
        let indices = [];
        let idx = sets.indexOf(uniqueSets[i]);
        while(idx != -1) 
        {
            indices.push(idx);
            idx = sets.indexOf(uniqueSets[i], idx + 1);
        }

        //Once we have the indices, loop through them and randomly attempt to do a vertical join until we have one
        let counter = 0;
        while((counter < indices.length) || (finished[uniqueSets[i]] == false))
        {
            let mergeDecision = Math.random();
            //console.log("Attempting to make row " + (rowNum + 1) + " column " + indices[counter % indices.length] + " value " +  currTable.rows[rowNum].cells[indices[counter % indices.length]].innerHTML);

            if(mergeDecision > .5 || indices.length == 1)
            {
                //console.log("Changing row " + (rowNum + 1) + " column " + indices[counter % indices.length]);
                currTable.rows[rowNum + 1].cells[indices[counter % indices.length]].innerHTML = currTable.rows[rowNum].cells[indices[counter % indices.length]].innerHTML;
                finished[uniqueSets[i]] = true;
                //Remove the bottom classlist if the cell had previously failed to perform a vertical join
                currTable.rows[rowNum].cells[indices[counter % indices.length]].classList.remove("bottom");
            }
            else
            {
                currTable.rows[rowNum].cells[indices[counter % indices.length]].className += " bottom";
            }
            counter++;
        }
    }
    let newRow = [];
    //Fill in any remaining spaces in the next row with new sets
    for(let j = 0; j < currTable.rows[rowNum + 1].cells.length; j++)
    {
        if(currTable.rows[rowNum + 1].cells[j].innerHTML == "")
        {
            currTable.rows[rowNum + 1].cells[j].innerHTML = newSetNum;
            newRow.push(newSetNum);
            newSetNum++;
        }
        else
        {
            newRow.push(currTable.rows[rowNum + 1].cells[j].innerHTML);
        }
    }

    return newRow;
}

/**
 * Randomly joins cells in different sets
 */
function randHorizontalJoin(sets, currRow)
{
    let tempSets = [];
    for(let i = 0; i < sets.length; i++)
    {
        let mergeDecision = Math.random();

        if(i != sets.length - 1)
        {
            //If the current cell and the cell to the right are in the same set, but a wall between them
            //Otherwise, attempt to merge them
            if(currRow.cells[i].innerHTML == currRow.cells[i+1].innerHTML)
            {
                //console.log("Putting wall b/tween " + currRow.cells[i].innerHTML + " and " + currRow.cells[i+1].innerHTML)
                currRow.cells[i].className += " right";
            }
            else if(mergeDecision > .5)
            {
                currRow.cells[i+1].innerHTML = currRow.cells[i].innerHTML;
            }
            else
            {
                currRow.cells[i].className += " right";
            }
        }
        tempSets.push(currRow.cells[i].innerHTML);
    }
    return tempSets;
    
}

/**
 * Generates a point on the outside of the maze and assigns it to be either entry or exit
 * @param {} x width of maxe
 * @param {*} y height of maze
 * @param {*} table Table representing the maze
 * @return Table with start and end points
 */
function generateOutsidePoints(x, y, table)
{
    //Create a random entry point
    let axisSelection = Math.random();
    
    //Choose the first axis randomly to avoid bias
    if(axisSelection > .5)
    {
        //Generate the x value first
        startingX = Math.floor(Math.random() * (x - 1));
        //If the x value is 0 or max, we have y options
        if(startingX == 0 || startingX == x)
        {
            startingY = Math.floor(Math.random() * (y - 1));
        }
        //If the x value is not 0 or max, there are only 2 values to choose from: 0 or y-1
        else
        {
            let yCoord = Math.random();
            if(yCoord > .5)
            {
                startingY = y - 1;
            }
        }
    }
    else
    {
        //Generate the Y value first
        startingY = Math.floor(Math.random() * (y - 1));
        //If the Y value is 0 or y, we have x options for the x axis
        if(startingY == 0 || startingY == y)
        {
            startingX = Math.floor(Math.random() * (x - 1));
        }
        //If the Y value is not 0 or y, we can oly have 2 values: 0 or x-1
        else
        {
            let xCoord = Math.random();
            if(xCoord > .5)
            {
                startingX = x - 1;
            }
        }
    }
    
    //Render the start point on the table
    let currCell = table.rows[startingY].cells[startingX];
    currCell.className += " start";
    //Once we have the starting point, create an ending point on the opposite side of the maze
    endingX = (x - 1) - startingX;
    endingY = (y - 1) - startingY;
    //Render the end point as well
    currCell = table.rows[endingY].cells[endingX];
    currCell.className += " end";
    return table;
}


