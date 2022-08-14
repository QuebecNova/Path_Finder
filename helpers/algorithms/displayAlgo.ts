import { ObjCellsData } from '../../types/pathTypes'

export function displayPath(curCellsData: ObjCellsData, endCell: string) {
	const path: string[] = [curCellsData[endCell].prevCell]
	let finished = false
	return function createPath(prev: string) {
		if (curCellsData[prev].start || finished) {
			finished = true
			path.pop()
			path.reverse().forEach((cell, i) => {
				setTimeout(() => {
					document.getElementById(cell)?.classList.add('cellPath')
				}, 15 * i)
			})
			return
		}
		const prevCell = curCellsData[prev].prevCell
		path.push(prevCell)
		createPath(prevCell)
	}
}

export function displayVisitedNode(cellID: string) {
	document.getElementById(cellID)?.classList.add('cellVisited')
}

export function displayPlannedToVisitNode(cellID: string) {
	document.getElementById(cellID)?.classList.add('cellPlanned')
}
