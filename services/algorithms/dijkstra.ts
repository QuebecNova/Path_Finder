import { ObjCellsData, ObjWalls } from '../../types/pathTypes'
import displayPath from './displayPath'
import getCellName from '../getCellName'

export function dijkstra(
	cellsData: ObjCellsData,
	startCell: string,
	endCell: string,
	walls: ObjWalls
): (cell: string) => void {
	const visitedCells: string[] = []
	const cellsDataCopy: ObjCellsData = JSON.parse(JSON.stringify(cellsData))
	let isFirstRun = true
	let foundEndCell = false

	return function animateAlgorythm(cell: string) {
		if (foundEndCell) return
		const currCell = cellsDataCopy[cell]
		currCell.nearestCellsCoords.forEach((coord, i) => {
			const cellName = getCellName(coord.x, coord.y)
			if (visitedCells.includes(cellName)) return

			const nearestCell = cellsDataCopy[cellName]
			nearestCell.distance = currCell.distance + 1
			nearestCell.prevCell = cell

			if (cellName === endCell) {
				foundEndCell = true
				displayPath(cellsDataCopy, endCell)(cellsDataCopy[endCell].prevCell)
				return
			}

			if (!visitedCells.includes(cellName)) {
				if ((cellName === startCell && !isFirstRun) || walls[cellName]) {
					visitedCells.push(cellName)
					return
				}

				visitedCells.push(cellName)
				isFirstRun = false
				setTimeout(() => {
					document.getElementById(cellName)?.classList.add('cellVisited')
					animateAlgorythm(cellName)
				}, 50)
			}
		})
	}
}
