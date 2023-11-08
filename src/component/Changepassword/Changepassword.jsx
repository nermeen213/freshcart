import { useState } from 'react';
import style from './Changepassword.module.css';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {Audio} from 'react-loader-spinner'
import * as Yup from 'yup';
import { useContext } from 'react';
import { UserContext } from '../Context/userContext';

export default function ChangePassword() {
  let Navigate = useNavigate();
  let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let {setuserToken}=useContext(UserContext)
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)
async function resetPassword(values){
  try {
    let{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
    
  
    if(data?.token){
      console.log(data);
      setisLoading(false)
      localStorage.setItem('userToken',data.token)
      setuserToken(data.token)
      Navigate ('/')
    }
  } catch (error) {
    console.log(error);
  }
 
}
let x =Yup.object({
 
  email:Yup.string().matches(emailRegex ,'email is invalid').required('email is required'),
  newPassword:Yup.string().matches(passwordRegex , 'Minimum eight characters, at least one letter and one number:').required('password is required'),

  

 })

  let formik= useFormik({

    initialValues: {
      email:"",
      newPassword:""
    },validationSchema:x,
    onSubmit:resetPassword

  })

  return <>
   <div className="row w-75 mx-auto ">
    <div className="col-md-12 bg-main-light p-4  ">
      <form onSubmit={formik.handleSubmit}>
       
        <label htmlFor="email">Enter Your Email :</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name="email" id="email" className='w-100 form-control mb-3 my-2 '/>
      {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}


      <label htmlFor="password">new Password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword}  type="password" name="newPassword" id="password" className='w-100 form-control mb-3 '/>
      {formik.errors.newPassword && formik.touched.newPassword?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.newPassword}</div>:''}
  
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