import axios from './config'

export const getBannerRequest = () => {
  return axios.get('/banner')
}

export const getRecommendListRequest = () => {
  return axios.get('/personalized')
}