import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ObjCellsData, ObjWalls } from '../../types/cellData'

interface IPathFinderState {
	cellsData: ObjCellsData
	walls: ObjWalls
	visitedCells: ObjWalls
	clearPressed: boolean
}

const initialState: IPathFinderState = {
	cellsData: {},
	walls: {},
	visitedCells: {},
	clearPressed: false,
}

const PathFinderSlice = createSlice({
	name: 'pathFinder',
	initialState,
	reducers: {
		setCellsData(state, action: PayloadAction<ObjCellsData>) {
			state.cellsData = action.payload
		},
		setIsWall(state, action: PayloadAction<string>) {
			state.walls[action.payload] = true
		},
		clear(state) {
			state.walls = {}
			state.clearPressed = !state.clearPressed
		},
	},
})

export const { setCellsData, setIsWall, clear } = PathFinderSlice.actions

export default PathFinderSlice.reducer
