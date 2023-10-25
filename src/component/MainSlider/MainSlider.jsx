import React from 'react';
import style from './MainSlider.module.css';
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-3.jpeg'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import blog1 from '../../Assets/images/main.png'
import blog2 from '../../Assets/images/f49947f0-25f7-45f4-b6ab-0359d404bd09.jpg'

import Slider from 'react-slick'

export default function MainSlider() {
  
  const settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows:false,
    autoplay: true,
    autoplaySpeed:1000,
  };
  return <>
   <div className="row g-0 ">
    <div className="col-md-9">
    <Slider {...settings}>
      <img className='W-100' height={300} src={slider1} alt="photo" />
      <img className='W-100' height={300}  src={slider2} alt="photo" />
      <img className='W-100' height={300}  src={slider3} alt="photo" />
    </Slider>

    </div>
    <div className="col-md-3">
      <img src={blog1} alt="" className='w-100' height={150} />
      <img src={blog2} alt="" className='w-100' height={150} />
    </div>
    </div>


  
    
  </>
}