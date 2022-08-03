import styles from '../styles/Header.module.scss'
import Button from './UI/Button'
import { useAppDispatch } from './../hooks/redux'
import { clear } from '../store/slices/PathFinderSlice'

export default function Header() {

  const dispatch = useAppDispatch()

  function dispatchClear() {
    dispatch(clear())
  }

  function animateAlgorythm() {

  }

  return (
    <div className={styles.header}>
      <Button onClick={dispatchClear}>Clear Walls</Button>
      <Button onClick={animateAlgorythm}>Animate!</Button>
    </div>
  )
}