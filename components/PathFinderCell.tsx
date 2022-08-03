import React from 'react';
import { useAppSelector } from '../hooks/redux'
import { setIsWall } from '../store/slices/PathFinderSlice';
import styles from '../styles/PathFinder.module.scss'
import { useAppDispatch } from './../hooks/redux';

type Props = {
    col: number,
    row: number,
    isStart: boolean,
    isFinish: boolean,
    isWall: boolean,
    isVisited: boolean
}

function PathFinderCell({col, row, isStart, isFinish, isWall, isVisited}: Props) {

    const Drawing = useAppSelector(state => state.Drawing)
    const dispatch = useAppDispatch()
    const cellName = `x${col}y${row}`

    function displayWall(e : React.MouseEvent<HTMLDivElement>) {
        if (!Drawing.isDrawing) return
        e.preventDefault()
        dispatch(setIsWall(cellName))
    }

  return (
    <div
        onMouseEnter={displayWall}
        className=
            {`
                ${styles.pathFinderCell}
                ${isWall && !isStart && !isFinish ? styles.cellWall : ''}
                ${isStart ? styles.cellStart : ''}      
                ${isFinish ? styles.cellFinish : ''}
                ${isVisited ? styles.cellVisited : ''}
            `}
    ></div>
  )
}

export default React.memo(PathFinderCell)