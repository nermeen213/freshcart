import React from 'react';
import style from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick'


export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,
  };
function gategorySlider(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

}
let {isError,isLoading,data} = useQuery('gategorySlider',gategorySlider)



  return <>
  <h2 className='pt-5 fs-4 fw-bolder'> Shop Popular Categories</h2>
    {data?.data.data? <div className='py-4 pt-2 '>
      <Slider {...settings}>
      {data?.data.data.map((category)=><>
      <img key={category._id} className='w-100 px-1' height={200} src={category.image}/>
      <h2 className='text-center h6 text-main p-2 key'>{category.name.split(" ").slice(0,3).join(' ')}</h2>
      
      
      </>
      )}
      </Slider>
    </div>:""}
  </>
}

