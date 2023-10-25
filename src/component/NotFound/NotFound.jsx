import React from 'react';
import style from './NotFound.module.css';
import error from '../../Assets/images/error.svg'

export default function NotFound() {
  return <>
  <div className='d-flex justify-content-center align-items-center'>
    <img src={error} alt="notfound" />
  </div>
   
  </>
}