import styles from '../styles/Header.module.scss'
import Button from './UI/Button'
import { useAppDispatch, useAppSelector } from './../hooks/redux'
import { setSelectedAlgo, clearAll, clearWalls } from '../store/slices/PathFinderSlice'
import Select from './UI/Select'
import selectOptions from '../data/selectData'
import { dijkstra } from '../services/pathFinder/dijkstra'

export default function Header() {

  const selectedAlgo = useAppSelector(state => state.PathFinder.selectedAlgo)
  const cellsData = useAppSelector(state => state.PathFinder.cellsData)
  const startCell = useAppSelector(state => state.PathFinder.startCell)
  const endCell = useAppSelector(state => state.PathFinder.endCell)
  const walls = useAppSelector(state => state.PathFinder.walls)
  const dispatch = useAppDispatch()

  function dispatchClearWalls() {
    dispatch(clearWalls())
  }

  function dispatchClearAll() {
    dispatch(clearAll())
  }

  function startAnimation() {
    dijkstra(cellsData, startCell, endCell, walls)(startCell)
  }

  function changeSelected(e : React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSelectedAlgo(e.target.value))
  }

  return (
    <div className={styles.header}>
      <Select 
        options={selectOptions} 
        defaultValue='Choose Algorythm' 
        onChange={changeSelected} 
        value={selectedAlgo}
      />
      <Button onClick={dispatchClearAll}>Clear All</Button>
      <Button onClick={dispatchClearWalls}>Clear Walls</Button>
      <Button onClick={startAnimation}>Animate!</Button>
    </div>
  )
}