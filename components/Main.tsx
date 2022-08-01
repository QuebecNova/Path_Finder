import styles from '../styles/Main.module.scss'
import PathFinder from './PathFinder'

export default function Main() {
  return (
    <div className={styles.main}>
        <PathFinder/>
    </div>
  )
}