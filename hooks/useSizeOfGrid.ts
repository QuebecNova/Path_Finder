import { MutableRefObject, useEffect, useState } from 'react'
import useCurrentWidth from './useCurrentWidth'

export function useSizeOfGrid(ref: MutableRefObject<null | HTMLDivElement>): {
	x: number
	y: number
} {
	const currentWindowWidth = useCurrentWidth()
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)

	useEffect(() => {
		if (!ref.current) return

		//to get correct number of y and x we
		//need devide our width and size by cell width-height(30)
		setX(Math.floor(ref.current.clientWidth / 30))
		setY(Math.floor(ref.current.clientHeight / 30))
	}, [ref, currentWindowWidth])

	return { x, y }
}
