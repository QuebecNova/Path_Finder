import { ObjCellsData, ObjWalls } from '../../types/pathTypes'
import displayPath from './displayPath'
import getCellName from './getCellName'

export function dijkstra(
	cellsData: ObjCellsData,
	startCell: string,
	endCell: string,
	walls: ObjWalls
): (cell: string) => void {
	const visitedCells: string[] = []
	let first = true
	let found = false
	const cellsDataCopy: ObjCellsData = JSON.parse(JSON.stringify(cellsData))
	return function animateAlgorythm(cell: string) {
		if (found) return
		const prevCell = cellsDataCopy[cell]
		prevCell.nearestCellsCoords.forEach((coord, i) => {
			const cellName = getCellName(coord.x, coord.y)
			const currCell = cellsDataCopy[cellName]
			if (visitedCells.includes(cellName)) return
			currCell.distance = prevCell.distance + 1
			currCell.prevCell = cell
			if (cellName === endCell) {
				found = true
				displayPath(cellsDataCopy, endCell)(cellsDataCopy[endCell].prevCell)
				return
			}
			if (!visitedCells.includes(cellName)) {
				if ((cellName === startCell && !first) || walls[cellName]) {
					visitedCells.push(cellName)
					return
				}
				visitedCells.push(cellName)
				first = false
				setTimeout(() => {
					document.getElementById(cellName)?.classList.add('cellVisited')
					animateAlgorythm(cellName)
				}, 50)
			}
		})
	}
}
