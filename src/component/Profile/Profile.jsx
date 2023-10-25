import React, { useContext, useEffect } from 'react';
import style from './Profile.module.css';
import jwtDecode from 'jwt-decode';   //take code incoded and take you decoded
import { UserContext } from '../Context/userContext';
import { Helmet } from 'react-helmet';

export default function Profile() {
let{userdata}=useContext(UserContext);


  let encoded =localStorage.getItem('userToken');
  let decoded =jwtDecode(encoded)
  let x =localStorage.getItem('userdata')

  
  return <>
  <Helmet>
  <meta name="description" content="" />
  <title>profile</title>
</Helmet>
  <div className=' bg-main-light text-main h-75 Profile p-5 font '>
    <h3>Welcome {decoded.name} <i className="fa-solid fa-heart text-danger"></i></h3>
    <h3>Your Email <i className="fa-regular fa-envelope text-main"></i> :{x} </h3>
  </div>
    
  </>
}