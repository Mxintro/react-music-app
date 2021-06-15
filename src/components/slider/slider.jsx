import * as React from 'react'
import { SliderContainer } from './style';
import 'swiper/swiper.min.css'
import Swiper, { Paginatio, Autoplay, Pagination } from 'swiper'
Swiper.use([Pagination, Autoplay])

const { useEffect, useState } = React

const Slider = (props) => {
  const { bannerList } = props
  const [sliderSwiper, setSliderSwiper] = useState(null)

  useEffect (() => {
    if (bannerList.length && !sliderSwiper){
        let newSliderSwiper = new Swiper(".slider-container", {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {el:'.swiper-pagination'},
        });
        setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return(
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map ((slider, index) => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </SliderContainer>
  )
}

export default React.memo(Slider)