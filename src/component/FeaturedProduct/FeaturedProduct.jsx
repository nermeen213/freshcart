import React, { useContext, useEffect, useState } from 'react';
import style from './FeaturedProduct.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import {BallTriangle} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function FeaturedProduct() {
 let {addToCart,setnumberitems,getWishlist,addWishList,setWishlistCount} =useContext(CartContext);


 async function addProduct(productId){

  let response = await addToCart(productId)

  if(response.data.status==='success'){
    toast.success('product succefully added',{
      duration: 3000 ,
      position: "bottom-right",
      className: 'toast-message',
      
      
    })
    setnumberitems(response.data.numOfCartItems)

  }else{
    
    toast.error('the addition operation failed')
    
  }
  
   
 }

// **********************************
  async function getWishProducts(id){

    
    let {data} =await getWishlist(id)
    // console.log(data);
    await getWishItem();
    if(data?.status==='success'){
    
      
      toast.success('Product added successfully to your wishlist',{
        duration: 3000 ,
        position: "bottom-right",
        className: 'toast-message',
   })
   }else{
    toast.error('the addition operation failed')

   }
   
  }




 async function getWishItem(){
  let{data}=await addWishList()
  if (data?.status == "success") {
    if (data.count == 0) {
      setWishlistCount(0)
    }
    else {
      setWishlistCount(data?.count)
    }
  }

  }
  useEffect(()=>{
    getWishItem()
  })
  // **********************************
  function getFeaturedProduct(){

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
   
   }
   
   let {isLoading ,isFetching,isError,data} = useQuery('featureProducts',getFeaturedProduct,{
    cacheTime:3000,
    // refetchOnMount:false,
    // staleTime:3000,
    // refetchInterval:1000

   })
   


 return<>

<Helmet>
  <meta name="description" content="" />
  <title>Featured Products</title>
</Helmet>
 
 {isLoading?<div className='w-100 py-5 d-flex justify-content-center'>
<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
</div>:

  <div className="row">
    {data?.data.data.map((product)=><div key={product._id} className='col-md-2'>
   
    <div className='product px-2 py-3 cursor-pointer'>
     <Link to={`./productdetails/${product._id}`}>
    <Link onClick={()=>getWishProducts(product._id)}><i className="fa-solid fa-heart text-danger heart fs-1 " ></i></Link> 
        <img src={product.imageCover} className='w-100' alt={product.title} />
        <span className='text-main font-sm fw-bold  py-3'>{product.category.name}</span>
        <h3 className='h6 fw-bolder '>{product.title.split(' ').slice(0,2 ).join(" ")}</h3>
        <div className='d-flex justify-content-between mt-3'>
          <span>{product.price}   EGP</span>
          <span><i className='fas fa-star rating-color'></i>  {product.ratingsQuantity}</span>
        </div>
       

      </Link>

      <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white btn-sm mt-2 w-100  '>Add To Card</button>

      </div>
      
     
     

    </div>)}
  </div>
 }

 
 </>


}



