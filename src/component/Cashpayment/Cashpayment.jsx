import React, { useContext, useState } from 'react';
import style from './Cashpayment.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup'
import { CartContext } from '../Context/CartContext';
import { Audio } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Address() {
  const [isLoading, setisLoading] = useState(false)
let navigate=useNavigate();

  let{cashPayment,cardId,setnumberitems}=useContext(CartContext);
   const [erorr, seterorr] = useState(null)

  let phoneRegex =/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

   

  async function handlecash(values){
    try {
      setisLoading(true)
      let {data}= await cashPayment(cardId , values)      
        if(data?.status == 'success'){
          console.log(data);
          toast.success('The payment process was completed successfully',{
            duration: 3000 ,
            position: "Bottom right",
            className: 'toast-message',
            
            
          })
          setisLoading(false)
          setnumberitems(0)
          navigate('/allorders')
      
        }else{
          
          toast.error('the addition operation failed Try again')
          
        }
        
      } catch (error) {
        console.log('err',error);
      
      }
       
    
     }
  


 








 
   let x =Yup.object({
    details:Yup.string().required('details is required'),
    phone:Yup.string().matches(phoneRegex,'Phone is in valid').required('phone is required'),
    city:Yup.string().required('city is required')

   })
  let formik =useFormik({
    initialValues:{
      details: "",
      phone: "",
      city: ""
      },validationSchema:x,
      onSubmit:handlecash
      
  });
  

  
  return <>
   <div>
   {/* {error!== null?<div className='alert mt-2 p-2 alert-danger'>{error}</div>:''} */}
    <form  onSubmit={formik.handleSubmit}>

      <label htmlFor="details">Details</label>
      <input type="text" id="details" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} name='details' className='form-control  my-2 '/>
      {formik.errors.details&& formik.touched.details?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.details}</div>:''}

      <label htmlFor="phone">Phone</label>
      <input type="tel" id="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' className='form-control  my-2 '/>
      {formik.errors.phone && formik.touched.phone?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:''}

      
      <label htmlFor="city">City</label>
      <input type="text" id="city" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange}name='city' className='form-control  my-2 '/>
      {formik.errors.city&& formik.touched.city?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.city}</div>:''}
      
       {/* <button onClick={handleOnSubmit} className='btn bg-main text-white m-2 ' type='submit' >online payment</button> */}
       {isLoading?<button onClick={handlecash}  disabled={!(formik.isValid && formik.dirty)} type='button' className='btn bg-main text-white '>
       <Audio
  height="20"
  width="80"
  color="#fff"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
/>
      </button>:<>
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white '>pay now</button>
      
      </> 
}




    </form>
   </div>
  </>
}