import React, { useEffect, useState } from 'react';
import style from './SpecificCategories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {BallTriangle} from 'react-loader-spinner'


export default function SpecificCategories() {
 let params =useParams()

 const [supcategories, setsupcategories] = useState(null)
  async function getSupCategories(id){
    
    let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setsupcategories(data)
    console.log(data);
    

    }
    useEffect(()=>{
      getSupCategories(params.id)

    },[])





  async function getSpecificCategories(id){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  

  }




  let {data,isError,isLoading}=useQuery('specificcategories',()=>
    getSpecificCategories(params.id)

  )
  
  
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
</div>:<div className='row d-flex align-items-center justify-content-center '>
  <div className="col-md-3 productCAT m-3">
    <img src={data?.data.data.image} alt={data?.data.data.title} className='w-100'/>

  </div>
  <div className="col-md-8">
    <h3 className='fw-bolder'>{data?.data.data.name}</h3>
    {supcategories?.data.map((cate)=><h3 className=' btn btn-info m-1 fs-6 bg-main-light' key={cate._id}>{cate.name}</h3>)}

  </div>
  </div>}
  </>
}