import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import getCellName from '../../services/getCellName'
import { ObjCellsData, ObjWalls, ISetCellsData } from '../../types/pathTypes'

interface IPathFinderState {
	cellsData: ObjCellsData
	walls: ObjWalls
	clearPressed: boolean
	selectedAlgo: 'dijkstra'
	isAnimatingAlgo: boolean
	startCell: string
	endCell: string
}

const initialState: IPathFinderState = {
	walls: {},
	cellsData: {},
	clearPressed: false,
	selectedAlgo: 'dijkstra',
	isAnimatingAlgo: false,
	startCell: '',
	endCell: '',
}

const PathFinderSlice = createSlice({
	name: 'pathFinder',
	initialState,
	reducers: {
		setIsWall(state, action: PayloadAction<string>) {
			const element = document.getElementById(action.payload)
			let containsStartOrFinish = false
			element?.classList.forEach((name) => {
				if (name.includes('cellStart') || name.includes('cellFinish')) {
					containsStartOrFinish = true
				}
			})
			if (!containsStartOrFinish) {
				state.walls[action.payload] = true
				element?.classList.add('cellWall')
			}
		},
		setCellsData(state, action: PayloadAction<ISetCellsData>) {
			state.cellsData = action.payload.cellsData
			if (action.payload.startCell) {
				state.startCell = action.payload.startCell
				state.cellsData[action.payload.startCell].start = true
				state.cellsData[action.payload.startCell].distance = 0
			}
			if (action.payload.endCell) {
				state.endCell = action.payload.endCell
				state.cellsData[action.payload.endCell].end = true
			}
		},
		setStartCell(state, action: PayloadAction<string>) {
			state.startCell = action.payload
			state.cellsData[action.payload].start = true
			state.cellsData[action.payload].distance = 0
		},
		setEndCell(state, action: PayloadAction<string>) {
			state.endCell = action.payload
			state.cellsData[action.payload].end = true
		},
		clearWalls(state) {
			state.walls = {}
			const walls = document.querySelectorAll('.cellWall')
			walls.forEach((wall) => wall.classList.remove('cellWall'))
			state.clearPressed = !state.clearPressed
		},
		clearAnimation(state) {
			for (const cell in state.cellsData) {
				document
					.getElementById(cell)
					?.classList.remove('cellVisited', 'cellPath')
			}
			state.clearPressed = !state.clearPressed
		},
		setSelectedAlgo(state, action: PayloadAction<string>) {
			if (action.payload === 'dijkstra') {
				state.selectedAlgo = action.payload
			}
		},
	},
})

export const {
	setIsWall,
	setCellsData,
	clearWalls,
	clearAnimation,
	setSelectedAlgo,
	setStartCell,
	setEndCell,
} = PathFinderSlice.actions

export default PathFinderSlice.reducer
