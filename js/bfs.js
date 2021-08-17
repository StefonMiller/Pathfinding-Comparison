/**
 * Utilizes breadth-first search to find the exit
 * @param {} x current x value
 * @param {*} y current y value
 * @param {} time time to wait between iterations
 */
async function bfs(startX, startY, time)
{
    let maze = document.getElementsByClassName("mazeDiv")[1];
    let mazeTable = maze.getElementsByTagName("table")[0];
    let counter = maze.getElementsByTagName("h4")[0];
    
    //Initialize the counter for the function
    if(typeof bfs.steps == 'undefined') 
    {
       bfs.steps = 0;
    }

    //Mark each cell as visited as we go
    if(!mazeTable.rows[startY].cells[startX].classList.contains("visited"))
    {    
        mazeTable.rows[startY].cells[startX].classList += " visited path";
    }
    //The maze is complete if we reach the end
    if(mazeTable.rows[startY].cells[startX].classList.contains("end"))
    { 
        return true;
    }
    
    //Create a queue and add the starting point to it
    mazeQueue = [mazeTable.rows[startY].cells[startX]];

    //Dequeue the first entry in the queue and enqueue all adjacent cells
    while(mazeQueue.length != 0)
    {
        //Increment the steps and update the h4 tag on every iteration
        bfs.steps++;
        counter.innerHTML = "Cells checked: " + bfs.steps;

        //Determine current coordinates
        let x = mazeQueue[0].cellIndex;
        let y = mazeQueue[0].parentElement.rowIndex;

        //Mark current cell as visited
        if(!mazeTable.rows[y].cells[x].classList.contains("visited"))
        {    
            mazeTable.rows[y].cells[x].classList += " visited path";
        }
        //Check if we are at the ending cell
        if(mazeTable.rows[y].cells[x].classList.contains("end"))
        {
            //If we are at the ending cell, update the class of every cell visited to be part of the solution
            for(i = 0; i < mazeTable.rows.length; i++)
            {
                for(j = 0; j < mazeTable.rows[i].cells.length; j++)
                {
                    if(mazeTable.rows[i].cells[j].classList.contains("path") && !mazeTable.rows[i].cells[j].classList.contains("start") && !mazeTable.rows[i].cells[j].classList.contains("end"))
                    {
                        mazeTable.rows[i].cells[j].classList.add("sol");
                    }
                }
            }
            return true;
        }
        //Delete first entry in the queue
        mazeQueue.shift();

        /*
            Determine which adjacent cells to add to the queue
            Valid cells to add can't be visited and can't be outside the bounds of the maze
            Additionally, there can't be barriers between adjacent cells
        */
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
        
        //Sleep between iterations
        await sleep(time);
    }
 
}
 
function sleep(ms) 
{
     return new Promise(resolve => setTimeout(resolve, ms));
}