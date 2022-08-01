import React, { ReactNode } from 'react'
import styles from './Button.module.scss'

type Props = {
  className?: string
  onClick?: () => void
  children?: ReactNode
}

export default function Button(props : Props) {
  return (
    <button className={`${styles.btn} ${props.className || ''}`} onClick={props.onClick}>
        {props.children}  
    </button>
  )
}