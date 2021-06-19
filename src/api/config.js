import axios from 'axios';

export const baseURL = "http://localhost:4000"

const axiosInstance = axios.create ({
  baseURL: baseURL
})

axiosInstance.interceptors.response.use (
  res => res.data,
  err => console.error(err, '网络错误')
)

export const categoryTypes = [{
  name: "华语男",
  type: 1,
  area: 7,
},
{
  name: "华语女",
  type: 2,
  area: 7,
},
{
  name: "华语组合",
  type: 3,
  area: 7,
},
{
  name: "欧美男",
  type: 1,
  area: 96,
},
{
  name: "欧美女",
  type: 2,
  area: 96,
},
{
  name: "欧美组合",
  type: 3,
  area: 96,
},
{
  name: "日本男",
  type: 1,
  area: 8,
},
{
  name: "日本女",
  type: 2,
  area: 8,
},
{
  name: "日本组合",
  type: 3,
  area: 8
},
{
  name: "韩国男",
  type: 1,
  area: 16,
},
{
  name: "韩国女",
  type: 2,
  area: 16,
},
{
  name: "韩国组合",
  type: 3,
  area: 16,
},
{
  name: "其他男歌手",
  type: 1,
  area: 0,
},
{
  name: "其他女歌手",
  type: 2,
  area: 0,
},
{
  name: "其他组合",
  type: 3,
  area: 0,
},
];

// 歌手首字母
export const alphaTypes = [{
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];

export default axiosInstance