import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request';

//immer in redux

export const getHotSingerList = createAsyncThunk(
  'singers/getHotSingerList',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const {singers: {pageCount}} = getState()
    try {
      const data = await getHotSingerListRequest(pageCount)
      dispatch(changeSingerList(data?.artists))
      dispatch(changeEnterLoading(false))
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

// 两种用法，可以直接调用dispatch, 也可以放到extraReducers中
export const getSingerList = createAsyncThunk(
  'singers/getSingerList',
  async ({type, area}, { dispatch, getState }) => {
    const data = await getSingerListRequest(type, area, 0)
    dispatch(changeSingerList(data?.artists))
    console.log(data)
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
    changeSingerList: (state, { payload }) => {
      state.singerList = [...state.singerList, ...payload]
    },
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload
    },
    changePageCount: (state, { payload }) => {
      // 分类情况
      if ( payload === 0 ) {
        state = { ...state, pageCount: 0, singerList: []}
      } else {
        state.pageCount = payload
      }
    },
  }
})

export const {
  changeSingerList,
  changeEnterLoading,
  changePageCount,
} = singersSlice.actions

export default singersSlice.reducer