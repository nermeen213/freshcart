import React, { useEffect, useState } from 'react';
import style from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Categories() {


  async function getCategories(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
   

  }

  let{isLoading,data,isError}=useQuery('category',getCategories)
   
     

  return <>

<Helmet>
  <meta name="description" content="" />
  <title>categories</title>
</Helmet>
{isLoading? <div className='w-100 py-5 d-flex justify-content-center'>
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
</div>:<div className='row gx-4 d-flex justify-content-center '>
  {data?.data.data?.map((category)=>
<div key={category._id} className="col-md-3 productCAT m-3">
<Link to={`/specificcategories/${category._id}`} >
    <img src={category.image} alt="" className='w-100' height={300}/>
    <div className='text-center'>
      <h3 className='pt-3 h5 fw-bolder text-main'>{category.name}</h3>


     
    </div>
    </Link>  
    </div>)}
  </div>}




  </>
}
