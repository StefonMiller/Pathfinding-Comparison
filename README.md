## Pathfinding-Comparison
This website generates a single maze utilizing Eller's algorithm and illustrates the differences between DFS, BFS, and A* when solving it. 

# Eller's Algorithm
Eller's algorithm allows for generation of arbitrary sized mazes in linear time. Additionally, the mazes generated are guaranteed to be "Perfect". This means that any 2 cells have only 1 distinct path between them which also implies there are no cycles or isolated sections in the maze. The algorithm itself is iterative, building the maze one row at a time using set theory.

# Pathfinding Algorithms
From the tests on the website itself, we can see the true power of A* over its naive counterparts when traversing these mazes. Although A* evaluates more cells, it finishes in a fraction of the time that DFS does. BFS is far worse than its counterparts for maze navigation, struggling to finish on larger mazes. 
 

