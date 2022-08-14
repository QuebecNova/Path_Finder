import { ObjCellsData } from '../../types/pathTypes'

export default function getDistanceToEnd(
	cellsData: ObjCellsData,
	nextNode: string,
	endNode: string
): number {
	let cost = 0
	cost += Math.abs(cellsData[nextNode].x - cellsData[endNode].x)
	cost += Math.abs(cellsData[nextNode].y - cellsData[endNode].y)

	return cost
}
