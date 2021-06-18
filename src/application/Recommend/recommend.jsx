import * as React from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll'
import { Content } from './style';
import { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading';

import { useDispatch, useSelector } from "react-redux";
import { getBannerList, getRecommendList } from './store'

const { useEffect } = React

const Recommend = (props) => {

  const bannerList = useSelector(({ recommend }) => {
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
    // 存在时不需要再发请求
    if (!bannerList.size) {
      dispatch(getBannerList())
    }
    if (!recommendList.size) {
      dispatch(getRecommendList())
    }
  }, []);

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
    </Content>
  )
}

export default React.memo(Recommend);