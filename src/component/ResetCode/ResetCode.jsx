import React, { useState } from 'react'
import Style from './ResetCode.module.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Resetcode() {
    let navigate =useNavigate();
   const [code, setcode] = useState(null)
   const [error, seterror] = useState(null)
    async function resetCode(){
        let codeInput =document.getElementById('code').value;
        try {
            let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
                resetCode:codeInput
               });
             
              setcode(data)
               console.log(code);              

               if(data?.status=="Success"){
                toast.success('Code is Valid',{
                    duration: 3000 ,
                    position: "bottom-center",
                    className: 'toast-message',
               })
                navigate('/changepassword')
                console.log('hello');


               
               }else{
                toast.error('Code not valid')
            
               }
               
             
               
        } catch (error) {
        //    seterror(error)
           seterror(error?.response.data.message)
           
        }
     


    }

    return (
        <>
         {error?<p className='alert alert-danger my-2 p-2 w-75 mx-auto text-center  '>{error}</p>:""}
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
