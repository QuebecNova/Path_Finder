import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DrawTypes = 'wall' | 'movingStart' | 'movingEnd' | null

interface IDrawingState {
	drawingType: DrawTypes
}

const initialState: IDrawingState = {
	drawingType: null,
}

const DrawingSlice = createSlice({
	name: 'draw',
	initialState,
	reducers: {
		setDrawingType(state, action: PayloadAction<DrawTypes>) {
			state.drawingType = action.payload
		},
	},
})

export const { setDrawingType } = DrawingSlice.actions

export default DrawingSlice.reducer
