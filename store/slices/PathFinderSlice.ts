import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
			if (action.payload.start.cellName) {
				state.startCell = action.payload.start.cellName
				state.cellsData[action.payload.start.cellName].start = true
				state.cellsData[action.payload.start.cellName].distance = 0
			}
			if (action.payload.end.cellName) {
				state.endCell = action.payload.end.cellName
				state.cellsData[action.payload.end.cellName].end = true
			}
		},
		clearWalls(state) {
			state.walls = {}
			const walls = document.querySelectorAll('.cellWall')
			walls.forEach((wall) => wall.classList.remove('cellWall'))
			state.clearPressed = !state.clearPressed
		},
		clearAll(state) {
			state.walls = {}
			for (const cell in state.cellsData) {
				document
					.getElementById(cell)
					?.classList.remove('cellVisited', 'cellWall', 'cellPath')
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
	clearAll,
	setSelectedAlgo,
} = PathFinderSlice.actions

export default PathFinderSlice.reducer
