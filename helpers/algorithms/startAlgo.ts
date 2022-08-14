import { AlgoTypes } from '../../types/algo'
import { AStar } from './AStar'
import { dijkstra } from './dijkstra'
import { ObjCellsData, ObjWalls } from '../../types/pathTypes'
import { greedy } from './greedy'

export default function startAlgo(
	choosenAlgo: AlgoTypes,
	cellsData: ObjCellsData,
	startCell: string,
	endCell: string,
	walls: ObjWalls
): void {
	switch (choosenAlgo) {
		case 'dijkstra':
			dijkstra(cellsData, startCell, endCell, walls)(startCell)
			break
		case 'astar':
			AStar(cellsData, startCell, endCell, walls)(startCell)
			break
		case 'greedy':
			greedy(cellsData, startCell, endCell, walls)(startCell)
		default:
			break
	}
}
