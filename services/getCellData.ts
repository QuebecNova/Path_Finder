import { CellData } from '../types/pathTypes'

export function getCellData(
	x: number,
	y: number,
	xTotal: number,
	yTotal: number
): CellData {
	const nearestCells = []

	nearestCells.push({ x: x - 1, y: y })
	nearestCells.push({ x: x, y: y + 1 })
	nearestCells.push({ x: x + 1, y: y })
	nearestCells.push({ x: x, y: y - 1 })

	const filteredNearestCells = nearestCells.filter(
		(cell) =>
			cell.x !== 0 && cell.y !== 0 && cell.x <= xTotal && cell.y <= yTotal
	)

	const cellData: CellData = {
		x: x,
		y: y,
		nearestCellsCoords: filteredNearestCells,
		distance: Number.MAX_SAFE_INTEGER,
		prevCell: '',
		start: false,
		end: false,
	}
	return cellData
}
