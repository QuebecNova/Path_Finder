import { MutableRefObject, useEffect, useState } from 'react'
import useCurrentWidth from './useCurrentWidth'

export function useSizeOfGrid(ref: MutableRefObject<null | HTMLDivElement>) {
	const currentWindowWidth = useCurrentWidth()
	const [rows, setRows] = useState(0)
	const [cols, setCols] = useState(0)

	useEffect(() => {
		if (!ref.current) return

		//to get correct number of cols and rows we
		//need devide our width and size by cell width-height(30)
		setRows(Math.floor(ref.current.clientHeight / 30))
		setCols(Math.floor(ref.current.clientWidth / 30))
	}, [ref, currentWindowWidth])

	return [rows, cols]
}
