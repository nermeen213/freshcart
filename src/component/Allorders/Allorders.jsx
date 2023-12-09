import React from 'react';
import style from './Allorders.module.css';
import { useEffect,useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';


// **********************************

export default function Allorders() {
  const [userOrders, setuserOrders] = useState(null);
 useEffect(()=>{
 
  let res =jwtDecode(localStorage.getItem('userToken'))
  
  // setuserId(res.id)
  getUserOrders(res.id)
 },[]);




 async function getUserOrders(id){
  try {
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    
   setuserOrders(data)

   
   

  } catch (error) {


    
    
  }
 }

 if(userOrders===null){
    return <div className='w-100 py-5 d-flex justify-content-center'>
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
    </div>
 }


  return <>

<Helmet>
  <meta name="description" content="" />
  <title>all orders</title>
</Helmet>
   <div className="row g-5 ">
    <h2 className='fw-bolder h1 text-center text-main font fs-3'> All Orders</h2>
    {userOrders.map(function(order,idx){
      return <div key={idx} className='col-md-12 m-3 '>

        <div className='bg-main-light'>
         <h2 className='text-center'>order:{idx+1} </h2>
        
           
            <div className='p-3 mmm bw-bolder '>
          <h6 className=' fw-bolder dark '>user phone : {order.shippingAddress.phone}</h6>
          <h6 className='
            text-dark fw-bolder' > details : {order.shippingAddress.details}</h6>
          <h6 className='
            text-dark fw-bolder'>at : {order.shippingAddress.city}</h6>
          
          <h6 className='
           text-dark fw-bolder'> Payment Methoud : {order.paymentMethodType}</h6>
          <h6 className='
           text-dark fw-bolder '>Totel Price : {order.totalOrderPrice} EGP</h6>

          </div>

             
            {order.cartItems?.map(function(item , index){

                   return <div className='row d-flex align-items-center text-main p-3 m-0  border-bottom '>
                    <div key={index} className='col-sm-2 '>
                  <img src={item.product.imageCover} alt="" className='w-100 ' />
                   </div>
                   <div className='col-sm-4'>

                   <h6>Title : {item.product.title.split(" ").splice(0 , 2).join(" ")}</h6>
                  <p>count : {item.count}</p>
                     <p>price : {item.price}</p>
                   </div>

             
             </div>

                  

                      })}


           
         
          
         
        </div>

      </div>
    })}
   </div>
  </>
}