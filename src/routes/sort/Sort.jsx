import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import './Sort.css'

const Sort = () => {

  const [ grid, setGrid ] = useState([]);
  const [ stepsToSort, setStepsToSort ] = useState([]);
  const [ sorted, setSorted ] = useState(false)
  const [ count, setCount ] = useState(0);

  // const createSortBars = () => {

  // }

   // randomize array 
   const shuffle = (array) => {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  const createStartingGrid = () => {
    const matrix = [];
    for (let i = 5; i > 0; i--) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        if (j < i) {
          row.push('filled')
        } else {
          row.push('empty');
        }
      }
      matrix.push(row);
    }
    shuffle(matrix);

    setGrid(matrix)

    // figure out value of each array

  }

const findValues = (matrix) => {
  return matrix.map((row) => {
    let count = 0;
    row.forEach((cell) => {
      if (cell === 'filled') {
        count++;
      }
    })
    return count;
  })
};

const checkSorted = () => {
  const values = findValues(grid);
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== i) return false
  }
  return true;
}

const bubbleSort = () => {
    const sort = () => {
  
      const values = findValues(grid);
      
      const steps = [];
      let noSwap
      for (let i = 0; i < values.length; i++) {
        noSwap = true;
        for (let j = 0; j < values.length - 1; j++) {
            if (values[j] > values[j+1]) {
              let temp = values[j];
              values[j] = values[j+1];
              values[j+1] = temp;
              noSwap = false;
              // how to update grid?
              // swap grid at idx j and j + 1
              // swap(j, j+1, [...grid])
              // const newGrid = [...grid];
              // temp = newGrid[j];
              // newGrid[j] = newGrid[j+1];
              // newGrid[j+1] = temp;
              steps.push([j, j+1]);
            }
    
        }
        if (noSwap) {
          // console.log(steps[0]);
          return steps;
        }
      }
      // console.log(steps[0]);
      return steps;
    }
    
    const stepsToGo = sort();
    // let sorted = false;

      while(stepsToGo.length) {
        const values = findValues(grid);

        const [idx1, idx2 ] = stepsToGo.pop();
        const newGrid = [...grid];
        let temp = newGrid[idx1];
        newGrid[idx1] = newGrid[idx2];
        newGrid[idx2] = temp;
        setGrid(newGrid)
        // for (let i = 0; i < values.length; i++) {
        //   console.log([i, values[i]])
        //   // if (values[i] !== i+1) {
        //   //   continue;
        //   // }
        }
    }

    const handleClick = () => {
      while(!checkSorted()) {
        bubbleSort();
      }
    }


  useEffect(() => {
    createStartingGrid();
  }, [])


  return (
    <>
      <div className='navigation'>
        <NavLink to='/' as='span'>Home</NavLink>
        <NavLink to='/search' as='span'>Search</NavLink>
      </div>
      <div>
        Sort Page
        <button onClick={handleClick}>Bubble Sort</button>
        <div className='grid'>
          {
            grid.map((row, rowIdx) => {
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
    </>
  )
}

export default Sort;