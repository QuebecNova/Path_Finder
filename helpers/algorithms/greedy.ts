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
	const visitedCells: string[] = [startCell]
	const graphCopy: ObjCellsData = JSON.parse(JSON.stringify(graph))
	const plannedToVisit: PlannedCell[] = []
	const plannedToVisitCellNames: string[] = []
	const oneStepCost = 1
	const totalDistanceToEnd =
		getDistanceToEnd(graphCopy, startCell, endCell) + oneStepCost
	let founded = false
	return function findPath(cell: string) {
		if (founded) return

		graphCopy[cell].nearestCellsCoords.forEach((nearest) => {
			const nearestCellName = getCellName(nearest.x, nearest.y)
			if (
				walls[nearestCellName] ||
				plannedToVisitCellNames.includes(nearestCellName)
			) {
				return
			}

			graphCopy[nearestCellName].prevCell = cell
			if (nearestCellName === endCell) {
				founded = true
				displayPath(graphCopy, endCell)(graphCopy[endCell].prevCell)
				return
			}

			const distance =
				totalDistanceToEnd +
				getDistanceToEnd(graphCopy, nearestCellName, endCell)

			const nearestCell: PlannedCell = {
				name: nearestCellName,
				distance,
			}

			plannedToVisitCellNames.push(nearestCellName)
			displayPlannedToVisitNode(nearestCellName)
			plannedToVisit.push(nearestCell)
		})

		if (!plannedToVisit.length) return
		plannedToVisit.sort((a, b) => b.distance - a.distance)
		const plannedCell = plannedToVisit[plannedToVisit.length - 1]
		plannedToVisit.pop()

		if (!founded) displayVisitedNode(plannedCell.name)
		visitedCells.push(plannedCell.name)

		setTimeout(() => {
			findPath(plannedCell.name)
		}, 20)
	}
}
