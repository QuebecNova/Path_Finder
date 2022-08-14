import React from 'react';
import { useAppSelector } from '../hooks/redux'
import { setEndCell, setIsWall, setStartCell } from '../store/slices/PathFinderSlice';
import styles from '../styles/PathFinder.module.scss'
import { useAppDispatch } from './../hooks/redux';
import getCellName from '../helpers/getCellName';

type Props = {
    x: number,
    y: number,
    isStart: boolean,
    isFinish: boolean,
}

function PathFinderCell({x, y, isStart, isFinish}: Props) {

    const Drawing = useAppSelector(state => state.Drawing)
    const dispatch = useAppDispatch()
    const cellName = getCellName(x, y)

    function displayWall(e : React.MouseEvent<HTMLDivElement>) {
        if (!Drawing.drawingType) return
        const target = e.target as HTMLDivElement
        e.preventDefault()
        let targetIsWall = false
        switch (Drawing.drawingType) {
            case 'movingStart':
                target.classList.forEach(c => {
                    if (c.includes('cellWall')) targetIsWall = true
                })
                !targetIsWall && dispatch(setStartCell(target.id))
                break
            case 'movingEnd':
                target.classList.forEach(c => {
                    if (c.includes('cellWall')) targetIsWall = true
                })
                !targetIsWall && dispatch(setEndCell(target.id))
                break
            case 'wall':
                dispatch(setIsWall(cellName))
                break
            default:
                break
        }
    }

  return (
    <div
        onMouseMove={displayWall}
        id={cellName}
        className=
            {`
                ${styles.pathFinderCell}
                ${isStart ? styles.cellStart : ''}      
                ${isFinish ? styles.cellFinish : ''}
            `}
    ></div>
  )
}

export default React.memo(PathFinderCell)