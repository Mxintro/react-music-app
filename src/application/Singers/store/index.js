import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request';

//immer in redux

export const getHotSingerList = createAsyncThunk(
  'getHotSingerList',
  async (count, { rejectWithValue, dispatch }) => {
    try {
      const data = await getHotSingerListRequest(count)
      dispatch(changeSingerList(data?.artists))
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

// 两种用法，可以直接调用dispatch, 也可以放到extraReducers中
export const getSingerList = createAsyncThunk(
  'getSingerList',
  async ({category, alpha, count}, {dispatch}) => {
    const data = await getSingerListRequest(category, alpha, count)
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
    changePageCount: (state, action) => {
      state.pageCount = action.payload
    },
  }
})

export const {
  changeSingerList,
  changeEnterLoading,
  changePageCount,
} = singersSlice.actions

export default singersSlice.reducer