import React from 'react';
import style from './Brands.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import {BallTriangle} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {


  async function getBrands(){
    return await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
  }
  let {data,isError,isLoading }=useQuery('brands',getBrands)
  
console.log(data);

  return <>

<Helmet>
  <meta name="description" content="" />
  <title>Brands</title>
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
</div>:<div className='row d-flex justify-content-center '>
  {data?.data.data?.map((brand)=><div key={brand.id} className="col-md-3 productCAT m-3">
    <Link to={`/specificbrands/${brand._id}`}>
    <img src={brand.image} alt={brand.name} className='w-100' />
    <h3 className='h6 text-main fw-bolder '>{brand.name}</h3>
    </Link>
  </div>)}
  
  </div>}
  </>
}