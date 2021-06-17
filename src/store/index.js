import { configureStore } from '@reduxjs/toolkit'
import recommendSlice from '../application/Recommend/store'

export default configureStore({
  reducer: {
    recommend: recommendSlice
  },
})
