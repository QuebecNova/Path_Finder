import { ObjCellsData, ObjWalls } from '../../types/pathTypes'
import {
	displayPath,
	displayPlannedToVisitNode,
	displayVisitedNode,
} from './displayAlgo'
import getCellName from '../getCellName'
import getDistanceToEnd from './getDistanceToEnd'

interface PlannedCell {
	name: string
	distance: number
}

export function greedy(
	graph: ObjCellsData,
	startCell: string,
	endCell: string,
	walls: ObjWalls
): (cell: string) => void {
	let founded = false
	const visitedCells: string[] = [startCell]
	const graphCopy: ObjCellsData = JSON.parse(JSON.stringify(graph))
	const plannedToVisit: PlannedCell[] = []
	const oneStepCost = 1
	const totalDistanceToEnd =
		getDistanceToEnd(graphCopy, startCell, endCell) + oneStepCost
	return function findPath(cell: string) {
		graphCopy[cell].nearestCellsCoords.forEach((nearest) => {
			const nearestCellName = getCellName(nearest.x, nearest.y)
			if (visitedCells.includes(nearestCellName) || walls[nearestCellName])
				return
			const distance =
				totalDistanceToEnd +
				getDistanceToEnd(graphCopy, nearestCellName, endCell)
			const nearestCell: PlannedCell = {
				name: nearestCellName,
				distance,
			}
			plannedToVisit.push(nearestCell)
		})
		plannedToVisit.sort((a, b) => a.distance + b.distance)
		const plannedCell = plannedToVisit[plannedToVisit.length - 1]
		plannedToVisit.pop()
		displayPlannedToVisitNode(plannedCell.name)
		visitedCells.push(plannedCell.name)
		if (plannedCell.name === endCell || founded) {
			console.log('finished')
			founded = true
			return
		}
		setTimeout(() => {
			findPath(plannedCell.name)
		}, 50)
		visitedCells.forEach((cell) => displayVisitedNode(cell))
		console.log(plannedToVisit)
		console.log(visitedCells)
	}
}
