import * as React from 'react'
import Horizen from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from "./style";
import { List, ListItem, ListContainer } from './style'
import Scroll from '../../baseUI/scroll';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { getSingerList, changePageCount, resetState, changeEnterLoading} from './store'
import Loading from '../../baseUI/loading';

const { useState, useEffect, useCallback } = React

const getSingersListPayload = {}

const Singers = (props) => {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const singerList = useSelector(({ singers }) => singers.singerList )
  const pageCount = useSelector(({ singers }) => singers.pageCount )
  const enterLoading = useSelector(({ singers }) => singers.enterLoading)
  const dispatch = useDispatch()

  console.log(pageCount)

  useEffect(() => {
    dispatch(getSingerList(getSingersListPayload))
  }, [pageCount])

  const handleUpdateCategory = useCallback((item) => {
    const { type, area, name } = item
    getSingersListPayload.type = type
    getSingersListPayload.area = area
    setCategory(name)
    dispatch(resetState())
    dispatch(getSingerList(getSingersListPayload))
  },[category])

  const handleUpdateAlpha = useCallback((item) => {
    const { key, name } = item
    getSingersListPayload.alpha = key
    setAlpha(name)
    dispatch(resetState())
    dispatch(getSingerList(getSingersListPayload))
  },[alpha])

  const handlePullUp = () => {
    dispatch(changePageCount(pageCount+1))
    dispatch(changeEnterLoading(true))
  }

  const handlePullDown = () => {
    dispatch(changePageCount(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList(getSingersListPayload))
  }

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => (
            <ListItem key={item.accountId+''+index}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png').default} alt="music"/>}>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
            )
          )
        }
      </List>
    )
  }

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        oldVal={category}
        handleClick={handleUpdateCategory}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        oldVal={alpha}
        handleClick={handleUpdateAlpha}
      ></Horizen>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUp={ handlePullUp }
          pullDown={ handlePullDown }
          >
          { renderSingerList() }
        </Scroll>
      </ListContainer>
      { enterLoading ? <Loading></Loading> : null }
    </NavContainer>
  )
}

export default React.memo(Singers)