import { configureStore } from '@reduxjs/toolkit'
import favouriteSlice from '../features/favrouiteSlice'

export default configureStore({
  reducer: {
     favourite: favouriteSlice
  },
})