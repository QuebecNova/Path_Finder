import React from 'react'
import styles from '../styles/description.module.scss'

export default function Description() {
  return (
    <div className={styles.description}>
        <h2>
        <p>Choose pathfinding algorithm to animate path from green dot to red dot.</p>
        <p>You can draw walls, move start and end dot around using mouse.</p>
        <p>Finally, click `Animate!` to start animation.</p>
        </h2>
    </div>
  )
}
