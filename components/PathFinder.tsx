import { useRef } from 'react'
import { useSizeOfGrid } from '../hooks/useSizeOfGrid'
import styles from '../styles/PathFinder.module.scss'
import { useAppDispatch } from './../hooks/redux';
import { setIsDrawing } from '../store/slices/DrawingSlice';
import Grid from './Grid';

export default function PathFinder() {

  const pathFinderRef = useRef(null)
  const {x, y} = useSizeOfGrid(pathFinderRef)
  const dispatch = useAppDispatch()

  function setIsDrawingTrue(e : React.MouseEvent) : void {
    e.preventDefault()
    dispatch(setIsDrawing(true))
  }
  function setIsDrawingFalse() : void {
    dispatch(setIsDrawing(false))
  }

  return (
    <div 
      className={styles.pathFinder} 
      ref={pathFinderRef} 
      onMouseDown={setIsDrawingTrue} 
      onMouseUp={setIsDrawingFalse}
    > 
      <Grid xTotal={x} yTotal={y}/>
    </div>
  )
}