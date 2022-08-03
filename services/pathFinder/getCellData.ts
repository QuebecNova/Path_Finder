import { CellData } from '../../types/cellData'

export function getCellData(row: number, col: number): CellData {
	const nearestCells = []
	nearestCells.push({ x: row, y: col + 1 })
	nearestCells.push({ x: row, y: col - 1 })
	nearestCells.push({ x: row - 1, y: col })
	nearestCells.push({ x: row + 1, y: col })

	const filteredNearestCells = nearestCells.filter(
		(cell) => cell.x !== 0 && cell.y !== 0
	)

	const cellData: CellData = {
		x: row,
		y: col,
		nearestCellsCoords: filteredNearestCells,
	}
	return cellData
}
