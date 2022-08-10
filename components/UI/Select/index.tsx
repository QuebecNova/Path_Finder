import React from 'react'
import { Options } from '../../../types/options'
import styles from './Select.module.scss'

type Props = {
  options: Options[]
  defaultValue: string
  onChange: (e : React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  classN?: string
}

export default function Select({options, defaultValue, onChange, value, classN} : Props) {
  return (
    <select 
        className={`${styles.select} ${classN || ''}`}
        value={value}
        onChange={onChange}
    >
        <option value={''} disabled>{defaultValue}</option>
        {options.map(option => (
            <option value={option.value} key={option.value}>{option.name}</option>
        ))}
    </select>
  )
}