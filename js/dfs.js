/**
 * Does a recursive backtracking depth-first search to find the exit
 * @param {} x current x value
 * @param {*} y current y value
 */
async function dfs(x, y, time)
{
    let maze = document.getElementsByClassName("mazeDiv")[0];
    let mazeTable = maze.getElementsByTagName("table")[0];
    let counter = maze.getElementsByTagName("h4")[0];
    if(typeof dfs.steps == 'undefined') 
    {
        dfs.steps = 0;
    }
    dfs.steps++;
    counter.innerHTML = "Steps: " + dfs.steps;
    
    //Mark each cell as visited as we go
    if(!mazeTable.rows[y].cells[x].classList.contains("visited"))
    {    
        mazeTable.rows[y].cells[x].classList += " visited path";
    }
    //The maze is complete if we reach the end
    if(mazeTable.rows[y].cells[x].classList.contains("end"))
    { 
        return true;
    }

    let res = false;

    /*
        Try to go right, then left, then down, then up
        For each direction, we have to make sure we're not trying to step outside the maze boundaries
        Additionally, we must make sure there are no walls in the way and we have not already visited a cell
        Only continue traversing the maze if res is false(No end found)
    */

    if((!res) && (x != mazeTable.rows[y].cells.length - 1) && (!mazeTable.rows[y].cells[x+1].classList.contains("visited")) && (!mazeTable.rows[y].cells[x].classList.contains("right")))
    {
        await sleep(time);
        res = await dfs(x+1, y, time);
    }
    if((!res) && (x != 0) && (!mazeTable.rows[y].cells[x-1].classList.contains("visited")) && (!mazeTable.rows[y].cells[x-1].classList.contains("right")))
    {
        await sleep(time);
        res = await dfs(x-1, y, time);
    }
    if((!res) && (y != mazeTable.rows.length - 1) && (!mazeTable.rows[y+1].cells[x].classList.contains("visited")) && (!mazeTable.rows[y].cells[x].classList.contains("bottom")))
    {
        await sleep(time);
        res = await dfs(x, y+1, time);
    }
    if((!res) && (y != 0) && (!mazeTable.rows[y-1].cells[x].classList.contains("visited")) && (!mazeTable.rows[y-1].cells[x].classList.contains("bottom")))
    {
        await sleep(time);
        res = await dfs(x, y-1, time);
    }

    //Before returning, remove path from the classlist and add start if res is true(solution found)
    mazeTable.rows[y].cells[x].classList.remove("path");
    if(res && !mazeTable.rows[y].cells[x].classList.contains("start"))
    {
        mazeTable.rows[y].cells[x].classList.add("sol");
    }
    return res;

}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}