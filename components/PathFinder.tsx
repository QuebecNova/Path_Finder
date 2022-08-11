import { useRef } from 'react'
import { useSizeOfGrid } from '../hooks/useSizeOfGrid'
import styles from '../styles/PathFinder.module.scss'
import { useAppDispatch } from './../hooks/redux';
import { setDrawingType } from '../store/slices/DrawingSlice';
import Grid from './Grid';

export default function PathFinder() {

  const pathFinderRef = useRef(null)
  const {x, y} = useSizeOfGrid(pathFinderRef)
  const dispatch = useAppDispatch()

  function dispatchDrawingType(e : React.MouseEvent) : void {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    let isStartOrFinish = false
    console.log(target.classList.forEach(c => {
      if (c.includes('cellStart')) {
        isStartOrFinish = true
        dispatch(setDrawingType('movingStart'))
      } else if (c.includes('cellFinish')) {
        isStartOrFinish = true
        dispatch(setDrawingType('movingEnd'))
      }
    }));
    
    if (!isStartOrFinish) {
      dispatch(setDrawingType('wall'))
    }
  }
  function clearDrawingType() : void {
    dispatch(setDrawingType(null))
  }

  return (
    <div 
      className={styles.pathFinder} 
      ref={pathFinderRef} 
      onMouseDown={(e) => dispatchDrawingType(e)} 
      onMouseUp={clearDrawingType}
    > 
      <Grid xTotal={x} yTotal={y}/>
    </div>
  )
}