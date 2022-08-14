import { ObjCellsData, ObjWalls } from '../../types/pathTypes'

export function AStar(
	cellsData: ObjCellsData,
	startCell: string,
	endCell: string,
	walls: ObjWalls
): (cell: string) => void {
	const visitedCells: string[] = []
	const cellsDataCopy: ObjCellsData = JSON.parse(JSON.stringify(cellsData))
	let isFirstRun = true
	let foundEndCell = false
	const costOfPathToTheNextNode = 1
	let totalPathCost = 0
	const nextCell = {
		cost: Number.MAX_SAFE_INTEGER,
		name: startCell,
	}
	return function findPath(cell: string) {}
}
