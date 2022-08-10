import { ObjCellsData } from '../../types/pathTypes'

export default function displayPath(
	curCellsData: ObjCellsData,
	endCell: string
) {
	const path: string[] = [curCellsData[endCell].prevCell]
	let finished = false
	return function createPath(prev: string) {
		if (curCellsData[prev].start || finished) {
			finished = true
			path.pop()
			path.reverse()
			path.forEach((cell, i) => {
				setTimeout(() => {
					document.getElementById(cell)?.classList.add('cellPath')
				}, 15 * i)
			})
			return
		}
		if (!curCellsData[prev].start) {
			const prevCell = curCellsData[prev].prevCell
			path.push(prevCell)
			createPath(prevCell)
		}
	}
}
