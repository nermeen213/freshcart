import React, { useContext } from 'react';
import style from './Login.module.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {Audio} from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/userContext';


export default function Login() {


  let {userToken , setuserToken ,setuserdata} = useContext(UserContext);
  let Navigate = useNavigate();
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)

 async function submitLogin(values){
  setisLoading(true)
 let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
 .catch(
 
  (err)=>{
    setisLoading(false)
    seterror(err.response.data.message)
  } 
 )
 if(data.message === 'success'){
 
  setisLoading(false)
  localStorage.setItem('userToken',data.token)
  localStorage.setItem('userdata',data.user.email)
  setuserToken(data.token)
  setuserdata(data.user)
  Navigate ('/')
 }
 

 
 }




let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

 let x =Yup.object({
  
  email:Yup.string().matches(emailRegex ,'email is invalid').required('email is required'),
  password:Yup.string().matches(passwordRegex , 'Minimum eight characters, at least one letter and one number:').required('password is required'),

 
 })
  let formik =useFormik({
    initialValues:{
     
      email:'',
      password:'',
     
    },validationSchema:x ,
    onSubmit:submitLogin
  })




  return <>
    <div className='w-75 mx-auto my-2 py-5'>
      {error!== null?<div className='alert mt-2 p-2 alert-danger'>{error}</div>:''}
      
      <form  onSubmit={formik.handleSubmit}> 
      <h4 className='fs-4'>Login Now:</h4>
     
      <label htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name="email" id="email" className='w-100 form-control mb-3 '/>
      {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}

      <label htmlFor="password">Password:</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}  type="password" name="password" id="password" className='w-100 form-control mb-3 '/>
      {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}

     
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
      </button>: <>
      <div className='d-flex align-items-center '>

      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mx-2  '>Login</button>      <Link to={'/forgetpassword'} className='btn py-4'>Forget Password</Link>

      </div>
      <Link to={'/register'} className='btn'>Register Now</Link>

      </>
}
      

      </form>
    </div>
  </>
}