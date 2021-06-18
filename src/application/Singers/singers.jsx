import * as React from 'react'
import Horizen from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from "./style";

const Singers = (props) => {
  
  return (
    <NavContainer>
      <Horizen list={categoryTypes} title={"分类 (默认热门):"}></Horizen>
      <Horizen list={alphaTypes} title={"首字母:"}></Horizen>
    </NavContainer>
  )
}

export default React.memo(Singers)