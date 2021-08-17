/**
 * Does a recursive backtracking depth-first search to find the exit
 * @param {} x current x value
 * @param {*} y current y value
 */
async function astar(startX, startY, time)
{
    if(typeof astar.steps == 'undefined') 
    {
       astar.steps = 0;
    }
}
  
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}