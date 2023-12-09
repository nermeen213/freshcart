import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import {BallTriangle} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Cart() {
  const [isloading, setisloading] = useState(false)
 
let {getLoggedUserCart,removeProduct,updateProduct,clearCard, numberitems,setnumberitems}=useContext(CartContext);
const [CartDetails, setCartDetails] = useState(null)
   




async function getCart(){
  setisloading(true)
  let {data}= await getLoggedUserCart()
  setCartDetails(data)
setisloading(false)

  
}
useEffect(()=>{
  getCart()
},[])
 







async function updateItem(id ,count){
 
  let {data}=await updateProduct(id,count)
  let updateNumber=data?.data.products[0].count;
  setCartDetails(data)
  
}

 async function removeProductItems(id){
  let{data}=await removeProduct(id)
  setCartDetails(data)
  setnumberitems(data?.numOfCartItems)


}

async function clearItems(){
  setisloading(true)
  let{data}=await clearCard()
  setisloading(false)
  setCartDetails(0)
  setnumberitems(0)
 

}
if(CartDetails===null){
  return <div className="load d-flex align-items-center justify-content-center">
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
if(!numberitems){
  return <div  className="w-100 mx-auto p-3 bg-main-light my-2">
 <div className='d-flex justify-content-center align-items-center noCart flex-column  '>
      <h3 className=' fw-semibold text-main font' >Not found any product in card  <i className="fa-solid fa-cart-plus"></i>  </h3>
      <Link className='btn text-warning ' to={'/products'}>Get some products <i className='fas fa-arrow-right'></i></Link>
   


    </div>
</div>
}




  return <>
  <Helmet>
  <meta name="description" content="" />
  <title>cart List</title>
</Helmet>



 
    
  { CartDetails?<div className="w-100 mx-auto p-3 bg-main-light my-2 ">
      <h3 className='fw-bolder font text-main'>Shopping Cart :</h3>
      <h4 className='h5 fw-bolder my-3 '>Cart Items : {CartDetails.numOfCartItems}</h4>
     <div className='d-flex align-items-center justify-content-between'>
     <h4 className='h5  fw-bolder mb-4 '>Totel Cart Price : {CartDetails.data.totalCartPrice} EGP</h4>
      <button className='btn  btn-danger text-white btn-sm my-3' onClick={()=>clearItems()}>Clear Cart</button>

      </div> 
      
      {CartDetails?.data.products.map((product)=><div key={product.product.id} className="row d-flex justify-content-center align-content-center border-bottom py-2 px-2">
        
        <div className="col-md-1">
          <img src={product.product.imageCover} alt="" className='w-100'/>


        </div>
        <div className="col-md-11">
          <div className='d-flex justify-content-between align-content-center'>
            <div>
            <h3 className='h6'>{product.product.title.split(" ").slice(0,3).join(' ')}</h3>
            <h6 className='text-main'>Price: {product.price} EGP</h6>
            <h6 onClick={()=>removeProductItems(product.product.id)} className='cursor-pointer'><i className='fas fa-trash-can m-1 text-main '></i>Remove</h6>

            </div>
            <div>
              <button onClick={()=>updateItem(product.product.id,product.count+1)} className=' brdr-main px-2  rounded-1'>+</button>
              <span className='mx-2 '>{product.count}</span>
              <button onClick={()=>updateItem(product.product.id,product.count-1)} className='brdr-main px-2 rounded-1  '>-</button>
            </div>
           

          </div>

        </div>
       
      </div>
      
      
)}

       {/* <Link className='btn bg-main text-white btn-sm mt-2 w-100 fw-bolder  ' to={'/address'}>Online payment</Link> */}
       <Link className='btn bg-main text-white btn-sm mt-2 w-100 fw-bolder  ' to={'/cashPayment'}>Cash payment</Link>


    </div>:<div className='d-flex justify-content-center align-items-center noCart flex-column  '>
      <h3 className=' fw-semibold text-main font' >Not found any product in card  <i className="fa-solid fa-cart-plus"></i>  </h3>
      <Link className='btn text-warning ' to={'/products'}>Get some products <i className='fas fa-arrow-right'></i></Link>
   


    </div>
}


  


 
    
  </>
}








// :


// :
   
//     