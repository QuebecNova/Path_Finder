import { useState, useEffect } from 'react'

function getWidth() {
	return (
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth
	)
}

function useCurrentWidth(): number {
	let [width, setWidth] = useState(0)

	useEffect(() => {
		setWidth(getWidth())
	}, [])

	useEffect(() => {
		// timeoutId for debounce mechanism
		let timeoutId: string | number | NodeJS.Timeout | undefined
		const resizeListener = () => {
			// prevent execution of previous setTimeout
			clearTimeout(timeoutId)
			// change width from the state object after 150 milliseconds
			timeoutId = setTimeout(() => setWidth(getWidth()), 150)
		}
		window.addEventListener('resize', resizeListener)

		return () => {
			window.removeEventListener('resize', resizeListener)
		}
	}, [])

	return width
}

export default useCurrentWidth
