import { configureStore } from '@reduxjs/toolkit'
import DrawingReducer from './slices/DrawingSlice'
import PathFinderReducer from './slices/PathFinderSlice'

export const store = configureStore({
	reducer: {
		PathFinder: PathFinderReducer,
		Drawing: DrawingReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
