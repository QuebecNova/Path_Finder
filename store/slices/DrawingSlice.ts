import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDrawingState {
	isDrawing: boolean
	clearPressed: boolean
}

const initialState: IDrawingState = {
	isDrawing: false,
	clearPressed: false,
}

const DrawingSlice = createSlice({
	name: 'pathFinder',
	initialState,
	reducers: {
		setIsDrawing(state, action: PayloadAction<boolean>) {
			state.isDrawing = action.payload
		},
		setClearPressed(state, action: PayloadAction<boolean>) {
			state.clearPressed = action.payload
		},
	},
})

export const { setIsDrawing, setClearPressed } = DrawingSlice.actions

export default DrawingSlice.reducer
