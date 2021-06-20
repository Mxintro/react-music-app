import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request';

export const getSingerList = createAsyncThunk(
  'singers/getSingerList',
  async ( payload, { dispatch, getState }) => {

    const {singers: {pageCount}} = getState()
    let data = {}
    try {
      if (!Object.keys(payload).length === 0) {
        data = await getHotSingerListRequest(pageCount)
      } else {
        const { type, area, alpha} = payload
        const initial = alpha && alpha.toLowerCase()
        data = await getSingerListRequest(type, area, initial, pageCount)
      }
      data?.artists && dispatch(changeSingerList(data.artists))
      dispatch(changeEnterLoading(false))
    } catch (error) {
      console.error(error)
    }
  }
)

export const singersSlice = createSlice({
  name: 'singers',
  initialState:  {
    singerList: [],
    pullUpLoading: false,
    pullDownLoading: false,
    enterLoading: true,
    pageCount: 0
  },
  reducers: {
    // The keys in the object will be used to generate string action type constants
    // => { type: singers/changeSingerList}
    changeSingerList: (state, { payload }) => {
      state.singerList = [...state.singerList, ...payload]
    },
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload
    },
    changePageCount: (state, { payload }) => {
      state.pageCount = payload
    },
    resetState: (state) => {
      return {...state, singerList: [], pageCount: 0, enterLoading: false}
    },
  }
})

export const {
  changeSingerList,
  changeEnterLoading,
  changePageCount,
  resetState,
} = singersSlice.actions

export default singersSlice.reducer