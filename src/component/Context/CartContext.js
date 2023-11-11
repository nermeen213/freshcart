import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';

export let CartContext=createContext();


export default function CartContextProvider(props){

const [wishlistCount, setWishlistCount] = useState(0);

const [cardId, setcardId] = useState(null)
const [numberitems, setnumberitems] = useState(0)
   //*************************category ************************************** */



function getCategory(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  

}


   //*************************Add TO Cart ************************************** */

 async function getproductnumber(){
  let{data}=await getLoggedUserCart()
  if(data?.status==='success'){
    setnumberitems(data?.numOfCartItems)
    
  }

 }
 useEffect(()=>{
  getproductnumber()
  

 },[])


  let headers ={
    token:localStorage.getItem('userToken')
  };

   function addToCart(x){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{       //url
      productId:x                       //to send the backend
    },{
      headers:headers                   //convigration
                                            

    }).then((response)=>response)
    .catch((erorr)=>erorr);
                    

   }

   async function getLoggedUserCart(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:headers
    }).then((response)=>response).
    catch((erorr)=>erorr);


   }

   function removeProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:headers
    }).then((response)=>response).catch((erorr)=>erorr);
   }



   function updateProduct(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
      headers:headers
    }).then((res)=>res).
    catch((err)=>err);

   }
   function clearCard(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:headers
    }).then((res)=>res).catch((err)=>err);
   }

   //*************************WishList************************************** */

   function getWishlist(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      productId:id
    },{
      headers:headers 
    }).then((res)=>res).catch((err)=>err);

   

   }

   function addWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      headers:headers 
    }).then((res)=>res).catch((err)=>err);
   }


   async function getNumberWish(){

    let {data}=await addWishList();
    // console.log(data?.count);

    if(data?.status==='success'){
      
      setWishlistCount(data?.count)
      // console.log(wishlistCount);

    }
   
   }
   useEffect(()=>{

    getNumberWish()


   },[wishlistCount])



   function deleteWish(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
      headers:headers
    }).then((res)=>res).catch((err)=>err);

   }


   //*************************payment ************************************** */

   function onlinePayment(id ,url, values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,{ 
      shippingAddress:values

    }
    ,{
      headers
    }).then((res)=>res).catch((err)=>err);

   }
   function cashPayment(id , values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,{ 
      shippingAddress:values

    }
    ,{
      headers
    }).then((res)=>res).catch((err)=>err);

   }
  // 
  
   async function getId(){
    let{data}= await getLoggedUserCart();
    setcardId(data?.data._id)
   }
   useEffect(()=>{
    getId();

   },[])

   //*************************payment ************************************** */



 return <CartContext.Provider value={{cashPayment,setWishlistCount,wishlistCount,cardId,onlinePayment,deleteWish,addWishList,addWishList,setnumberitems,numberitems,addToCart,getLoggedUserCart,removeProduct ,updateProduct,clearCard,getWishlist}}>
    {props.children}
  </CartContext.Provider>

}
