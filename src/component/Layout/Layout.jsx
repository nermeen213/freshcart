import React from 'react';
import style from './Layout.module.css';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";



export default function Layout() {
  
  return <>
   <Navbar/>
  <div className="container">
  <Outlet></Outlet>

  </div>

  <div>
   
    <Offline>
      <div className='network'>
         <i className='fas fa-wifi pe-2'></i>Only shown offline (surprise!)
        </div>
        </Offline>
  </div>
   
   <Footer/>
  </>
}