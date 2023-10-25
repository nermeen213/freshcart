import React from 'react';
import style from './Specificbrands.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {BallTriangle} from 'react-loader-spinner'



export default function Specificbrands() {
 let params =useParams();
  async function getSpecificbrands(id){
   return await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)

  }
  let{data,isLoading,isError}=useQuery('specificbrands',()=>getSpecificbrands(params.id))
  
  return <>
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
</div>:<div className='row bg-main-light d-flex align-items-center p-3 brand  '>
  <div className="col-md-4">
    <img src={data?.data.data.image} alt={data?.data.data.name} className='w-100 border-3'/>
  </div>
  <div className="col-md-8">
    <h2 className=' fw-bolder '>{data?.data.data.name}</h2>
  </div>

  </div>}
  </>
}