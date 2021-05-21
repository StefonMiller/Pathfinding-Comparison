/**
 * Does a recursive backtracking depth-first search to find the exit
 * @param {} x current x value
 * @param {*} y current y value
 */
async function dfs(x, y)
{
    let maze = document.getElementsByClassName("mazeDiv")[0];
    let mazeTable = maze.getElementsByTagName("table")[0];
    console.log(x + ", " + y);
    //Mark each cell as visited as we go
    mazeTable.rows[y].cells[x].classList += " visited path";
    //The maze is complete if we reach the end
    if(mazeTable.rows[y].cells[x].classList.contains("end"))
    {
        console.log("Finished");
        return;
    }
    console.log(mazeTable.rows[y].cells[x]);

    let endDir = lookAhead(x, y);

    console.log(endDir);
    switch(endDir)
    {
        case 1:
            dfs(x+1, y);
        case 2:
            dfs(x-1, y);
        case 3:
            dfs(x, y+1);
        case 4:
            dfs(x, y-1);
    }
    //Try to go right, then left, then down, then up
    //For each direction, we have to make sure we're not trying to step outside the maze boundaries
    //Additionally, we must make sure there are no walls in the way and we have not already visited a cell
    if((x != mazeTable.rows[y].cells.length - 1) && (!mazeTable.rows[y].cells[x+1].classList.contains("visited")) && (!mazeTable.rows[y].cells[x].classList.contains("right")))
    {
        await sleep(200);
        console.log("Going right");
        dfs(x+1, y);
        console.log("Done going right");
    }
    if((x != 0) && (!mazeTable.rows[y].cells[x-1].classList.contains("visited")) && (!mazeTable.rows[y].cells[x-1].classList.contains("right")))
    {
        await sleep(200);
        console.log("Going left");
        dfs(x-1, y);
        console.log("Done going left");
    }
    if((y != mazeTable.rows.length - 1) && (!mazeTable.rows[y+1].cells[x].classList.contains("visited")) && (!mazeTable.rows[y].cells[x].classList.contains("bottom")))
    {
        await sleep(200);
        console.log("Going down");
        dfs(x, y+1);
        console.log("Done going down");
    }
    if((y != 0) && (!mazeTable.rows[y-1].cells[x].classList.contains("visited")) && (!mazeTable.rows[y-1].cells[x].classList.contains("bottom")))
    {
        await sleep(200);
        console.log("Going up");
        dfs(x, y-1);
        console.log("Done going up");
    }
    console.log("Can't go anywhere, returning..");
    mazeTable.rows[y].cells[x].classList.remove("path");
    return;

}

function lookAhead(x, y)
{
    let maze = document.getElementsByClassName("mazeDiv")[0];
    let mazeTable = maze.getElementsByTagName("table")[0];
    if((x != mazeTable.rows[y].cells.length - 1) && mazeTable.rows[y].cells[x+1].classList.contains("end") && (!mazeTable.rows[y].cells[x].classList.contains("right")))
    {
        return 1;
    }
    else if((x != 0) && mazeTable.rows[y].cells[x-1].classList.contains("end") && (!mazeTable.rows[y].cells[x-1].classList.contains("right")))
    {
        return 2;
    }
    else if((y != mazeTable.rows.length - 1) && mazeTable.rows[y+1].cells[x].classList.contains("end") && (!mazeTable.rows[y].cells[x].classList.contains("bottom")))
    {
        return 3;
    }
    else if((y!=0) && mazeTable.rows[y-1].cells[x].classList.contains("end") && (!mazeTable.rows[y-1].cells[x].classList.contains("bottom")))
    {
        return 4;
    }
    else
    {
        return -1;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}