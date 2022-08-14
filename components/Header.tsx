import styles from '../styles/Header.module.scss'
import Button from './UI/Button'
import { useAppDispatch, useAppSelector } from './../hooks/redux'
import { setChoosenAlgorithm, clearAnimation, clearWalls } from '../store/slices/PathFinderSlice'
import Select from './UI/Select'
import selectOptions from '../data/selectData'
import { AlgoTypes } from '../types/algo'
import startAlgo from '../helpers/algorithms/startAlgo'

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

  function dispatchClearAnimation() {
    dispatch(clearAnimation())
  }

  function startAnimation() {
        startAlgo(selectedAlgo, cellsData, startCell, endCell, walls)
  }

  function changeSelected(e : React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as AlgoTypes
    dispatch(setChoosenAlgorithm(value))
  }

  return (
    <div className={styles.header}>
      <Select 
        options={selectOptions} 
        defaultValue='Choose Algorythm'
        onChange={changeSelected} 
        value={selectedAlgo}
      />
      <Button onClick={dispatchClearAnimation}>Clear Animation</Button>
      <Button onClick={dispatchClearWalls}>Clear Walls</Button>
      <Button onClick={startAnimation}>Animate!</Button>
    </div>
  )
}