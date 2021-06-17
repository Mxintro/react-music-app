import * as React from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll'
import { Content } from './style';

import { useDispatch, useSelector } from "react-redux";
import { getBannerList, getRecommendList } from './store'

const { useEffect } = React

const Recommend = (props) => {

  const bannerList = useSelector(({ recommend }) => {
    console.log(recommend)
    return recommend.bannerList
  })

  const recommendList = useSelector(({ recommend }) => {
    return recommend.recommendList
  })

  const enterLoading = useSelector(({ recommend }) => {
    return recommend.enterLoading
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (!bannerList.size) {
      dispatch(getBannerList())
    }
    if (!recommendList.size) {
      dispatch(getRecommendList())
    }
  }, []);

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend);