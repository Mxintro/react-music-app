import * as React from 'react'
import Horizen from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from "./style";
import { List, ListItem, ListContainer } from './style'
import Scroll from '../../baseUI/scroll';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { getHotSingerList, getSingerList, changePageCount} from './store'

const { useState, useEffect, useCallback } = React

const Singers = (props) => {
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')

  const singerList = useSelector(({ singers }) => singers.singerList )
  const pageCount = useSelector(({ singers }) => singers.pageCount )

  const dispatch = useDispatch()

  console.log('render')
  useEffect(() => {
    console.log(pageCount)
    dispatch(getHotSingerList(pageCount))
  }, [pageCount])

  const handleUpdateCategory = useCallback((key) => {
    setCategory(key)
  },[category])

  const handleUpdateAlpha = useCallback((key) => {
    setAlpha(key)
  },[alpha])

  const handlePullUp = () => {
    console.log('pullUp')
    dispatch(changePageCount(pageCount+1))
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
          >
          { renderSingerList() }
        </Scroll>
      </ListContainer>
    </NavContainer>
  )
}

export default React.memo(Singers)