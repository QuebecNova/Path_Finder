import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setCellsData } from '../store/slices/PathFinderSlice'
import { ObjCellsData } from '../types/cellData'
import PathFinderCell from './PathFinderCell';
import { v4 as uuid } from 'uuid'
import { getCellData } from '../services/pathFinder/getCellData';

/*  
  /////////////////////// HOW GRID GENERATING WORKS: //////////////////////////
  First in PathFinder.module.scss we set size of our grid and grid-cells.
  Than we getting needed cols and rows number through hook useSizeOfGrid. 
  
  If user changes browser width or height, useSizeOfGrid recalculate it again 
  to fit exactly square-shaped. The browser size change handles useCurrentWidth hook.

  It's needed because if we use static number of rows and cols, some rows not containing
  enough cols to fit the size of PathFinder. 
*/

type Props = {
    cols: number
    rows: number
}

interface GridInfo {
    isWall: boolean,
    isVisited: boolean
}

interface GridData {
    [key: string]: GridInfo 
}

export default function Grid({cols, rows}: Props) {

    const dispatch = useAppDispatch()
    const [renderedGrid, setRenderedGrid] = useState<ReactNode[]>([])
    const PathFinder = useAppSelector(state => state.PathFinder)

  useEffect(() => {
    const cellsData : ObjCellsData = {}
    const grid = []
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const cellName = `x${col}y${row}`
        cellsData[cellName] = getCellData(row, col)

        //finish and start cells
        const isFinish = (row === Math.floor(rows / 2)) && (col === Math.floor(cols / 1.2))
        const isStart = (row === Math.floor(rows / 2)) && (col === Math.floor(cols / 4.5))

        const isWall = PathFinder.walls[cellName]
        const isVisited = PathFinder.visitedCells[cellName]

        grid.push(
            <PathFinderCell 
                key={uuid()} 
                col={col} 
                row={row} 
                isStart={isStart} 
                isFinish={isFinish}
                isWall={isWall}
                isVisited={isVisited}
            />
        )
      }
    }
    dispatch(setCellsData(cellsData))
    setRenderedGrid(grid)
  }, [rows, cols, dispatch, PathFinder.clearPressed, PathFinder.walls, PathFinder.visitedCells])

  return (
    <>
        {renderedGrid}
    </>
  )
}