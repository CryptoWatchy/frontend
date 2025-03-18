import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  favorites: number[] // Stores indexes of favorited cryptocurrencies
}

const initialState: FavoritesState = {
  favorites: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favorites.indexOf(action.payload)
      if (index >= 0) {
        state.favorites.splice(index, 1) // Remove from favorites
      } else {
        state.favorites.push(action.payload) // Add to favorites
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
