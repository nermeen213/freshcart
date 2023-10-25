import React from 'react';
import style from './Register.module.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {Audio} from 'react-loader-spinner'


export default function Register() {
  let Navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)

 async function submitRegister(values){
  setisLoading(true)
 let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
 .catch(
 
  (err)=>{
    setisLoading(false)
    seterror(err.response.data.message)
  } 
 )
 if(data.message === 'success'){
  setisLoading(false)
  Navigate ('/Login')
 }
 

 
 }




let phoneRegex =/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

 let x =Yup.object({
  name:Yup.string().min(3 , 'name minlength is 3').max(10 ,'name max is 10 ').required('name is required'),
  email:Yup.string().matches(emailRegex ,'email is invalid').required('email is required'),
  password:Yup.string().matches(passwordRegex , 'Minimum eight characters, at least one letter and one number:').required('password is required'),

  rePassword:Yup.string().oneOf([Yup.ref('password')], 'password and rePassword not match').required('rePassword is requird'),
  phone:Yup.string().matches(phoneRegex,'phone is invalid').required('phone is required')

 })
  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema:x ,
    onSubmit:submitRegister
  })




  return <>
    <div className='w-75 mx-auto my-2 py-5'>
      {error!== null?<div className='alert mt-2 p-2 alert-danger'>{error}</div>:''}
      
      <form  onSubmit={formik.handleSubmit}> 
      <h4 className='fs-4'>Register Now:</h4>
      <label htmlFor="name">Name:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className='w-100 form-control mb-3 '/>
      {formik.errors.name && formik.touched.name?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>:''}
      <label htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name="email" id="email" className='w-100 form-control mb-3 '/>
      {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}

      <label htmlFor="password">Password:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}  type="password" name="password" id="password" className='w-100 form-control mb-3 '/>
      {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}

      <label htmlFor="rePassword">rePassword:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword}  type="password" name="rePassword" id="rePassword" className='w-100 form-control mb-3 '/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div>:''}

      <label htmlFor="tel">phone:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}  type="tel" name="phone" id="tel" className='w-100 form-control mb-3 '/>
      {formik.errors.phone && formik.touched.phone?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:''}

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
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white '>Register</button><Link to={'/login'} className='btn'>Already have an account?</Link>
      
      </> 
}
      

      </form>
    </div>
  </>
}