import React, { useState } from 'react';
import style from './Forgetpassword.module.css';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {Audio} from 'react-loader-spinner'
import * as Yup from 'yup';
export default function Forgetpassword() {
  let Navigate = useNavigate();
  let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)
async function getPassword(values){
  let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
  .catch((err)=>
  {
    // setisLoading(false)
    // seterror(err.response.data.message)
  } )

  if(data.statusMsg === 'success'){
    console.log(data);
    setisLoading(false)
    Navigate ('/resetcode')
   }else{
    console.log('kkkk');
   }
}
let x =Yup.object({
 
  email:Yup.string().matches(emailRegex ,'email is invalid').required('email is required'),
  

 })

  let formik= useFormik({

    initialValues: {
      email :""
    },validationSchema:x,
    onSubmit:getPassword

  })

  return <>
   <div className="row w-75 mx-auto ">
    <div className="col-md-12 bg-main-light ">
      <form onSubmit={formik.handleSubmit}>
       
        <label htmlFor="email">Enter Your Email :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name="email" id="email" className='w-100 form-control mb-3 my-2 '/>

      {/* <button  type='submit' className='btn bg-main text-white '>submit</button> */}
      {isLoading?<button disabled={!(formik.isValid && formik.dirty)} type='button' className='btn bg-main text-white '>
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
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white '>submit</button>
      
      </> 
}

      </form>



    </div>


   </div>
  </>
}


// onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} 