import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './pageSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    page: pageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types
