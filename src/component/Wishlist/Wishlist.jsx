import React, { useContext, useEffect, useState } from 'react';
import style from './Wishlist.module.css';
import { useQuery } from 'react-query';
import { CartContext } from '../Context/CartContext';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Products from '../Products/Products';
import ProductDetails from '../ProductDetails/ProductDetails';
import Cart from '../Cart/Cart';
import { Helmet } from 'react-helmet';
import { BallTriangle } from 'react-loader-spinner';


export default function Wishlist() {
 const [isLoading, setisLoading] = useState(false)
 
    
  let{addWishList,addToCart,deleteWish,setnumberitems,setWishlistCount }=useContext(CartContext);

  const [wishItems, setwishItems] = useState(null)



  async function addProduct(productId){
    try {
      setisLoading(true)
      
      let {data} = await addToCart(productId)
     
     
     setisLoading(false)
    if(data.status==='success'){
     
      toast.success('product succefully added',{
        duration: 3000 ,
        position: "Bottom left",
        className: 'toast-message',
        
        
  
      })

      // setWishlistCount(data?.count)
  
    }else{
      
      toast.error('the addition operation failed')
  
    }
    
    } catch (error) {
      console.log('error',error);
      
    }

    
     
   }

  


async function getLoggedWishCart(){

  setisLoading(true)
 let{data}= await addWishList();
 

setwishItems(data)
setisLoading(false)


if (data?.status == "success") {
  if (data.count == 0) {
    setWishlistCount(null)
  }
  else {
    setWishlistCount(data?.count)
  }
}
}
useEffect(()=>{
  getLoggedWishCart()

},[])



async function deleteProduct(id){
  try {
    // setisLoading(false)
   
  let{data}= await deleteWish(id);
  setwishItems(data)
  
  // setisLoading(false)

  
  await getLoggedWishCart()
  // setWishlistCount(data?.count)
  // setisLoading(false)


  } catch (error) {
    console.log('error',error)
  }
  
}


return   <>
<Helmet>
  <meta name="description" content="" />
  <title>Wish List</title>
</Helmet>
{isLoading && (
  <div className="load d-flex align-items-center justify-content-center">
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
)}
{!isLoading && (
  <>
    <div className="p-2 mb-3 mt-4 bg-main-light overflow-hidden">
     

      {wishItems?.data.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center flex-column  noCart '>
        <h3 className=' fw-semibold text-main font fs-2'>Your WishList is Empty......  <i class="fa-solid fa-heart-crack fs-3 text-danger "></i>  </h3>
        <Link className='btn text-warning ' to={'/products'}>Get some products <i className='fas fa-arrow-right'></i></Link>
     
  
  
      </div>
      ) : (
        ""
      )}

      {wishItems?.data.map((item) => (
        <div
          key={item.id}
          className="row border-bottom py-2 align-items-center"
        >
          <div className="col-md-1">
            <img
              className="w-100 mb-2 mb-md-0"
              src={item.imageCover}
              alt={item.title}
            />
          </div>
          <div className="col-md-11">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="h6">
                  {item.title.split(" ").splice(0,2).join(' ')}
                </h3>
                <h6 className="text-main fw-semibold">
                  Price : {item.price} EGP
                </h6>
                <button
                  onClick={() => deleteProduct(item.id)}
                  className="btn p-0 "
                >
                  {/* <i class="fa-solid fa-heart-crack text-danger me-2 fs-3"></i> */}
                  <i className="fa-solid fa-trash-can text-danger me-1"></i>{" "}
                  Remove
                </button>
              </div>
              <div>
                <button
                  onClick={() => addProduct(item.id)}
                  className="btn btn-outline bg-main text-white"
                >
                  add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
   
  </>
)}
</>




}





// <div className='row'>
// {wishItems?.data?.map((item)=><div className='col-md-2 m-3  productCAT product'>

// <Link to={`./productdetails/${item._id}`}>
//   <Link ><i className="fa-solid fa-heart-crack text-danger heart fs-1" ></i></Link>
//   <img src={item.imageCover} alt="" className='w-100'/>
//   <span className='text-main font-sm fw-bold  py-3'>{item.name}</span>
//   <h3 className='h6 fw-bolder '>{item.title.split(' ').slice(0,2 ).join(" ")}</h3>
//     <div className='d-flex justify-content-between mt-3'>
//       <span>{item.price}   EGP</span>
//       <span><i className='fas fa-star rating-color'></i>  {item.ratingsQuantity}</span>
//     </div>

//     </Link>
//     <button onClick={()=>addProduct(item._id)} className='btn bg-main text-white btn-sm mt-2 w-100  '>Add To Card</button>

// </div>)}


// </div>


