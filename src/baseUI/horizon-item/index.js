import React, { useState, useRef, useEffect, memo } from 'react';
import styled from'styled-components';
import Scroll from '../scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style ["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style ["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style ["theme-color"]};
    border: 1px solid ${style ["theme-color"]};
    opacity: 0.8;
  }
`

const Horizen = (props) => {
  const { list, oldVal, title } = props;
  // 暴露点击方式
  const { handleClick } = props
  const Category = useRef (null);
  // const [ activeKey, setActiveKey ] = useState('')

  // 设置外包div宽度,不然scroll不滚动
  useEffect (() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll ("span");
    let totalWidth = 0;
    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  // // 组件内处理
  // const handleClick = (key) => {
  //   setActiveKey(key)
  // }

  return ( 
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map ((item) => {
              return (
                <ListItem 
                  key={item.key}
                  className={`${ oldVal=== item.key ? 'selected': ''}`} 
                  onClick={() => handleClick (item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};

export default memo (Horizen);