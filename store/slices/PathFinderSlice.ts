import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ObjCellsData } from '../../types/cellData'

interface IPathFinderState {
	cellsData: ObjCellsData
	clearPressed: boolean
}

const initialState: IPathFinderState = {
	cellsData: {},
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
			state.cellsData[action.payload].isWall = true
		},
		clear(state) {
			for (const cell in state.cellsData) {
				state.cellsData[cell].isWall = false
			}
			state.clearPressed = !state.clearPressed
		},
	},
})

export const { setCellsData, setIsWall, clear } = PathFinderSlice.actions

export default PathFinderSlice.reducer
