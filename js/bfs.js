/**
 * Does a recursive backtracking depth-first search to find the exit
 * @param {} x current x value
 * @param {*} y current y value
 */
async function bfs(startX, startY, time)
{
    let maze = document.getElementsByClassName("mazeDiv")[1];
    let mazeTable = maze.getElementsByTagName("table")[0];
    let counter = maze.getElementsByTagName("h4")[0];
    
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
        console.log("Finished");
        return true;
    }
 
    mazeQueue = [mazeTable.rows[startY].cells[startX]];

    while(mazeQueue.length != 0)
    {
        console.log(mazeQueue);
        bfs.steps++;
        counter.innerHTML = "Steps: " + bfs.steps;
        let x = mazeQueue[0].cellIndex;
        let y = mazeQueue[0].parentElement.rowIndex;
        //Mark each cell as visited as we go
        if(!mazeTable.rows[y].cells[x].classList.contains("visited"))
        {    
            mazeTable.rows[y].cells[x].classList += " visited path";
        }
        //The maze is complete if we reach the end
        if(mazeTable.rows[y].cells[x].classList.contains("end"))
        {
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
        
        await sleep(time);
    }
 
}
 
function sleep(ms) 
{
     return new Promise(resolve => setTimeout(resolve, ms));
}