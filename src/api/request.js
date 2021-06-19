import axios from './config'

export const getBannerRequest = () => {
  return axios.get('/banner')
}

export const getRecommendListRequest = () => {
  return axios.get('/personalized')
}

export const getHotSingerListRequest = (count) => {
  return axios.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return axios.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}