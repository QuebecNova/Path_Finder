import { ObjCellsData, ObjWalls } from '../../types/pathTypes'
import { displayPath, displayVisitedNode } from './displayAlgo'
import getCellName from '../getCellName'

export function dijkstra(
	cellsData: ObjCellsData,
	startCell: string,
	endCell: string,
	walls: ObjWalls
): (cell: string) => void {
	const visitedCells: string[] = [startCell]
	const cellsDataCopy: ObjCellsData = JSON.parse(JSON.stringify(cellsData))
	let foundEndCell = false

	return function findPath(cell: string) {
		if (foundEndCell) return
		const currCell = cellsDataCopy[cell]
		currCell.nearestCellsCoords.forEach((coord) => {
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

			if (cellName === startCell || walls[cellName]) {
				visitedCells.push(cellName)
				return
			}

			visitedCells.push(cellName)
			setTimeout(() => {
				displayVisitedNode(cellName)
				findPath(cellName)
			}, 50)
		})
	}
}
