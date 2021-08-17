/**
 * Does a recursive backtracking depth-first search to find the exit
 * @param {} x current x value
 * @param {*} y current y value
 */
async function bfs(x, y)
{
    let maze = document.getElementsByClassName("mazeDiv")[1];
    let mazeTable = maze.getElementsByTagName("table")[0];
    let counter = maze.getElementsByTagName("h4")[0];
    
    if(typeof bfs.steps == 'undefined') 
    {
       bfs.steps = 0;
    }
    bfs.steps++;
    counter.innerHTML = "Steps: " + bfs.steps;


    //Mark each cell as visited as we go
    if(!mazeTable.rows[y].cells[x].classList.contains("visited"))
    {    
        mazeTable.rows[y].cells[x].classList += " visited path";
    }
    //The maze is complete if we reach the end
    if(mazeTable.rows[y].cells[x].classList.contains("end"))
    { 
        console.log("Finished");
        return true;
    }
 
    mazeQueue = [mazeTable.rows[y].cells[x]];

    while(mazeQueue.length != 0)
    {
        let x = mazeQueue[0].cellIndex;
        let y = mazeQueue[0].parentElement.rowIndex;
        mazeQueue.shift();

        if((x != mazeTable.rows[y].cells.length - 1) && (!mazeTable.rows[y].cells[x+1].classList.contains("visited")) && (!mazeTable.rows[y].cells[x].classList.contains("right")))
        {
            mazeQueue.push(mazeTable.rows[y].cells[x+1]);

        }
        if((x != 0) && (!mazeTable.rows[y].cells[x-1].classList.contains("visited")) && (!mazeTable.rows[y].cells[x-1].classList.contains("right")))
        {
            mazeQueue.push(mazeTable.rows[y].cells[x-1]);
        }
        if((y != mazeTable.rows.length - 1) && (!mazeTable.rows[y+1].cells[x].classList.contains("visited")) && (!mazeTable.rows[y].cells[x].classList.contains("bottom")))
        { 
            mazeQueue.push(mazeTable.rows[y+1].cells[x]);

        }
        if((y != 0) && (!mazeTable.rows[y-1].cells[x].classList.contains("visited")) && (!mazeTable.rows[y-1].cells[x].classList.contains("bottom")))
        {
            mazeQueue.push(mazeTable.rows[y-1].cells[x]);

        }
    }
 
}
 
function sleep(ms) 
{
     return new Promise(resolve => setTimeout(resolve, ms));
}