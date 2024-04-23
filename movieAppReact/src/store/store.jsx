import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './reducers/movieSlice'
import TVSlice from './reducers/TVSlice'
import personSlice from './reducers/personSlice'

export const store = configureStore({
  reducer: {
    movie:movieSlice,
    tv: TVSlice,
    person: personSlice
  },
})