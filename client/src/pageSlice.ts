import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Page } from './types'


export interface PageState {
  pages: Page[];
  currentPage: Page | null;
}

const initialState: PageState = {
  pages: [],
  currentPage: null
}

export const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPageList: (state, action: PayloadAction<Page[]>) => {
      state.pages = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<Page['id']>) => {
      state.currentPage = state.pages.find(({id}) => id === action.payload) || null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageList } = pageSlice.actions

export default pageSlice.reducer