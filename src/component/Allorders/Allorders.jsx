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
   <div className="row g-3">
    <h2 className='fw-bolder h1 text-center text-main font fs-3'> All Orders</h2>
    {userOrders.map(function(order,idx){
      return <div key={idx} className='col-md-6'>

        <div className='bg-main-light'>

          <div className="p-3">
            <div className="row g-1 ">
            <div className='mx-3 box1'>
          <h6 className='  text-dark fw-bolder '>user phone : {order.shippingAddress.phone}</h6>
          <h6 className='
            text-dark fw-bolder ' > details : {order.shippingAddress.details}</h6>
          <h6 className='
            text-dark fw-bolder '>at : {order.shippingAddress.city}</h6>
          
          <h6 className='
           text-dark fw-bolder '> Payment Methoud : {order.paymentMethodType}</h6>
          <h6 className='
           text-dark fw-bolder '>Totel Price : {order.totalOrderPrice} EGP</h6>

          </div>

             
            {order.cartItems?.map(function(item , index){

                   return <div className='col-sm-4 item product productCAT box1'>
                    <div key={index} className=' my-1 item'>
                  <img src={item.product.imageCover} alt="" className='w-100' />

              <h6>Title : {item.product.title.split(" ").splice(0 , 2).join(" ")}</h6>
                  <p>count : {item.count}</p>
                     <p>price : {item.price}</p>
             </div>

                   </div>

                      })}


            </div>
          </div>
          
         
        </div>

      </div>
    })}
   </div>
  </>
}