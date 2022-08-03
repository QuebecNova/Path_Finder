import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDrawingState {
	isDrawing: boolean
}

const initialState: IDrawingState = {
	isDrawing: false,
}

const DrawingSlice = createSlice({
	name: 'draw',
	initialState,
	reducers: {
		setIsDrawing(state, action: PayloadAction<boolean>) {
			state.isDrawing = action.payload
		},
	},
})

export const { setIsDrawing } = DrawingSlice.actions

export default DrawingSlice.reducer
