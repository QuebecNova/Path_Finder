import styles from '../styles/Main.module.scss'
import Description from './Description'
import PathFinder from './PathFinder'

export default function Main() {
  return (
    <div className={styles.main}>
        <Description/>
        <PathFinder/>
    </div>
  )
}