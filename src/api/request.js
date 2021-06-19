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

export const getSingerListRequest= (type=-1, area=-1, count=0) => {
  return axios.get(`/artist/list?type=${type}&area=${area}&offset=${count}`);
}

export const getSortedSingerListRequest= (type=-1, area=-1, initial, count=0) => {
  return axios.get(`/artist/list?type=${type}&area=${area}&offset=${initial}&offset=${count}`);
}