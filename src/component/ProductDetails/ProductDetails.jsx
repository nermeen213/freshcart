import React, { useContext, useState } from 'react';
import style from './ProductDetails.module.css';
import { Params, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';


export default function ProductDetails() {
  let {addToCart,setnumberitems} =useContext(CartContext);
  async function addProduct(productId){

    let response = await addToCart(productId)
  
    if(response.data.status==='success'){
      toast.success('product succefully added',{
        duration: 3000 ,
        position: "Bottom right",
        className: 'toast-message',
        
  
      })
      setnumberitems(response.data.numOfCartItems)

  
    }else{
      
      toast.error('the addition operation failed')
  
    }
    
     
   }

  const settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000,

  };
  // const [productDetails, setproductDetails] = useState(null)
  let params=useParams()
  function getProductDetails(id){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    // setproductDetails(data?.data.data)

  }

  let {isLoading,isError,data} =useQuery('productDetails',()=>getProductDetails(params.id))
  

  return <>
    
    
    
    {data?.data.data?<div className='row d-flex justify-content-center align-items-center'>
    
      <div className="col-md-3">
       <Slider {...settings}>
        {data?.data.data.images.map((image)=><img key={data?.data.data.id} src={image} className='w-100'/>)}
        

      
      </Slider>
      </div>
    
     
      <div className="col-md-9">
        <h2 className='h5 fw-bold pt-5'>{data?.data.data.title}</h2>
        <p className='fs-6 font-sm'>{data?.data.data.description}</p>
       
       
        <h6 className='font-sm fw-bold'>{data?.data.data.category.name}</h6>
        
         
        <div className='d-flex justify-content-between '>
          <span className='fw-bold font-sm'>Price:{data?.data.data.price} EGP</span>

          <div>
          <i className='fas fa-star rating-color'></i>
          <span className='fw-bold font-sm'>{ data?.data.data.ratingsQuantity}</span>

          </div>
         
        

        </div>
        <button onClick={()=>addProduct(data?.data.data.id)} className='btn bg-main text-white w-100 fs-6 mt-3 '> + Add To Cart</button>
        

        
       
      </div>

    </div>:""}
  </>
}