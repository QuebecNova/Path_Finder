import React, { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setCellsData } from '../store/slices/PathFinderSlice'
import { ObjCellsData } from '../types/pathTypes'
import PathFinderCell from './PathFinderCell';
import { getCellData } from '../helpers/getCellData';
import getCellName from '../helpers/getCellName';

/*  
  /////////////////////// HOW GRID GENERATING WORKS: //////////////////////////
  First in PathFinder.module.scss we set size of our grid and grid-cells.
  Than we getting needed xs(x) and ys(y) number through hook useSizeOfGrid. 
  
  If user changes byser width or height, useSizeOfGrid recalculate it again 
  to fit exactly square-shaped. The byser size change handles useCurrentWidth hook.

  It's needed because if we use static number of ys and xs(x), some ys(y) not containing
  enough xs(x) to fit the size of PathFinder. 
*/

type Props = {
    xTotal: number
    yTotal: number
}

interface GridData {
    [key: string]: ReactNode
}

export default function Grid({xTotal, yTotal}: Props) {

    const dispatch = useAppDispatch()
    const [renderedGrid, setRenderedGrid] = useState<GridData>({})
    const clearPressed = useAppSelector(state => state.PathFinder.clearPressed)
    const startCell = useAppSelector(state => state.PathFinder.startCell)
    const endCell = useAppSelector(state => state.PathFinder.endCell)

  useEffect(() => {
    const cellsData : ObjCellsData = {}
    const grid : GridData = {}
    let start = ''
    let end = ''
    for (let y = 1; y <= yTotal; y++) {
      for (let x = 1; x <= xTotal; x++) {
        const cellName = getCellName(x, y)
        cellsData[cellName] = getCellData(x, y, xTotal, yTotal)

        //finish and start cells
        //CAN BUG WHEN RESIZING WINDOW
        const isStartNeedsDefault = (!startCell && ((y === Math.floor(yTotal / 2)) && (x === Math.floor(xTotal / 4.5))))
        const isEndNeedsDefault = (!endCell && ((y === Math.floor(yTotal / 2)) && (x === Math.floor(xTotal / 1.2))))
        
        const isStart = (cellName === startCell) || isStartNeedsDefault
        const isFinish = (cellName === endCell) || isEndNeedsDefault
        
        if (isStart) start = cellName
        if (isFinish) end = cellName

        grid[cellName] = (
            <PathFinderCell 
                key={cellName} 
                x={x} 
                y={y} 
                isStart={isStart} 
                isFinish={isFinish}
            />
        )
      }
    }
    dispatch(setCellsData({cellsData, startCell: start, endCell: end}))
    setRenderedGrid(grid)
  }, [yTotal, xTotal, dispatch, clearPressed, startCell, endCell])

  return (
    <>
        {Object.values(renderedGrid)}
    </>
  )
}