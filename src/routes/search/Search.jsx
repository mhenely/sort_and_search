import { useState, useEffect } from 'react'
// import { NavLink } from 'react-router-dom';

import './Search.styles.css'

const Search = () => {

  const [ maze, setMaze ] = useState([]);
  const [ currentTimeouts, setCurrentTimeouts ] = useState([]);
  const [ speed, setSpeed ] = useState(60);
  const [ speedLevel, setSpeedLevel ] = useState(3);

  const runSearch = (search, startNode=[0,0], height=maze[0].length, width=maze.length) => {
    
    const queueOrStack = [startNode];

    let visited = new Set(`${startNode[0]}, ${startNode[1]}`);

    const vistCell = ([x, y]) => {
      // change className/color of visited cells
      setMaze((prevMaze) =>
        prevMaze.map((row, rowIdx) =>
          row.map((cell, cellIdx) => {
            if (rowIdx === y && cellIdx === x) {
              return cell === "end" ? "end" : "visited";
            }
            return cell;
          }),
        ),
      );

      return maze[y][x] === 'end'
    }

    const nextMove = () => {
      if (queueOrStack.length === 0) return;


      // for checking what type of search 
      let x = 0;
      let y = 0;

      if (search === 'bfs'){
        [x, y] = queueOrStack.shift();
      } else if (search === 'dfs') {
        [x, y] = queueOrStack.pop();
      } else {
        return;
      }
   
      const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has(`${nx}, ${ny}`)) {
          visited.add(`${nx}, ${ny}`);
          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (vistCell([nx, ny])){
              console.log('found')
              return true
            }
            queueOrStack.push([nx, ny])
          }
        }
      }
      // slow down search progress for better visualization
      const timeout = setTimeout(nextMove, speed)

      setCurrentTimeouts((timeouts) => [...timeouts, timeout])
    }

    nextMove();
    return false;
    // setAlreadyRun(true);
  } 


  const generateNewMaze = (height=30, width=30) => {
    currentTimeouts.forEach(clearTimeout)
    setCurrentTimeouts([]);

    const matrix = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push('wall')
      }
      matrix.push(row);
    }

    const isCellValid = (x, y) => {
      return y >= 0 && x >= 0 && y < height && x < width && matrix[y][x] === 'wall'
    }

    const generateMazePaths = (x, y) => {
      const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      
      matrix[y][x] = 'path'

      // randomize dirs orders
      const directions = dirs.sort(() => Math.random() - 0.5);

      for (const [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = 'path';
          generateMazePaths(nx, ny);
        }
      }
      
    }
    generateMazePaths(0, 1)
    matrix[0][0] = 'start'
    matrix[height - 1][width - 1] = 'end'
    setMaze(matrix)
  }


  useEffect(() => {
    generateNewMaze()
  }, [])

  const handleSpeed = (change) => {
    if (change === 'increase' && speed > 20) {
      setSpeed(speed - 20);
      setSpeedLevel(speedLevel + 1);
    } else if (change === 'decrease' && speed < 100) {
      setSpeed(speed + 20);
      setSpeedLevel(speedLevel - 1)
    }
  }

  return (
    <div className='body'>
      {/* <div className='navigation'>
        <NavLink to='/' as='span'>Home</NavLink>
        <NavLink to='/sort' as='span'>Sort</NavLink>
      </div> */}
      <div className='maze-grid'>
        <div className='controls-container'>
          <button className='maze-button' onClick={() => generateNewMaze(30, 30)}>New Maze</button>
          <div className='button-container'>
            <button className='maze-button' onClick={() => runSearch('bfs')}>BFS</button>
            <button className='maze-button' onClick={() => runSearch('dfs')}>DFS</button>
            <div className='speed-container'>
              <button onClick={() => handleSpeed('decrease')}>&#10094;</button>
              <h3>{`Speed (1-5): ${speedLevel}`}</h3>
              <button onClick={() => handleSpeed('increase')}>&#10095;</button>
            </div>
          </div>
        </div>
        <div className='maze'>
          {
            maze.map((row, rowIdx) => {
              return (
              <div key={rowIdx} className='row'>
                {
                  row.map((cell, cellIdx) => {
                    return (
                      <div key={cellIdx} className={`cell ${cell}`}>
                      </div>
                    )
                  })
                }
              </div> 
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Search;
