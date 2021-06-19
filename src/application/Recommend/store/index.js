import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

//immer in redux

export const getBannerList = createAsyncThunk(
  'recommend/getBannerList',
  async (_,{ rejectWithValue, dispatch }) => {
    try {
      const data = await getBannerRequest()
      dispatch(changeBannerList(data.banners))
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// 两种用法，可以直接调用dispatch, 也可以放到extraReducers中
export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => {
    const data = await getRecommendListRequest()
    return data.result
  }
)

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState:  {
    bannerList: [],
    recommendList: [],
    enterLoading: true
  },
  reducers: {
    changeBannerList: (state, action) => {
      state.bannerList = action.payload
    },
    changeRecommendList: (state, action) => {
      state.recommendList = action.payload
    },
    changeEnterLoading: (state, action) => {
      state.enterLoading = action.payload
    },
  },
  extraReducers: {
    [getRecommendList.fulfilled]: (state, action) => {
      return {...state, recommendList: action.payload, enterLoading: false}
    }
  }
})

export const {
  changeBannerList,
  changeRecommendList,
  changeEnterLoading,
} = recommendSlice.actions

export default recommendSlice.reducer