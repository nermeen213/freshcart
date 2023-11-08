import React from 'react'
import Style from './ResetCode.module.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Resetcode() {
    let navigate =useNavigate();
    async function resetCode(){
        let codeInput =document.getElementById('code').value;
        try {
            let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
                resetCode:codeInput
               });
              console.log(data);

               if(data?.status=="Success"){
                navigate('/changepassword')
                console.log('hello');
             }
               
        } catch (error) {
            console.log(error);
        }
     


    }

    return (
        <>
         <div className="w-75 mx-auto bg-main-light">
            <div className=" p-4">
                <label htmlFor='code' className='pb-3'>Enter Your code</label>
                <input type="number" name='code' id='code' className='form-control bg-white '/>
                 <button onClick={resetCode} className='btn bg-main text-white my-3 px-3'>Send</button>
            </div>

        </div>
            
        </>
    )
}
