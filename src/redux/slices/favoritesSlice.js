import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    // Action 1 – add a product (idempotent: skip if already present)
    addFavorite(state, action) {
      if (!state.items.find((f) => f.id === action.payload.id)) {
        state.items.push(action.payload)
      }
    },
    // Action 2 – remove a single product by id
    removeFavorite(state, action) {
      state.items = state.items.filter((f) => f.id !== action.payload)
    },
    // Action 3 – wipe the entire list
    clearFavorites(state) {
      state.items = []
    },
  },
})

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
