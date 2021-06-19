import { configureStore } from '@reduxjs/toolkit'
import recommendSlice from '../application/Recommend/store'
import singersSlice from '../application/Singers/store'

export default configureStore({
  reducer: {
    recommend: recommendSlice,
    singers: singersSlice
  },
})
