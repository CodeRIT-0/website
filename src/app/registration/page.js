"use client";

import Image from 'next/image';
import axios from "axios";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import "./animations.css"

export default function Home() {
  const router=useRouter();

  const [message,setMessage]=useState({text:"",color:""});
  const [showMsg,setShowMsg]=useState(false);
  const [showWindow,setShowWindow]=useState(false);
  const [load,setLoad]=useState(true);
  const [student,setStudent]=useState({name:"",usn:"",branch:"",email:"",phone:"",queries:""});

  const handleChange=(e)=>{
    e.preventDefault();
    const name=e.target.name;
    const value=e.target.value;
    setStudent({...student,[name]:value});
  }

  useEffect(()=>{
    const formArea=document.querySelector('#form-area');

    if(showWindow){
      formArea.classList.add('blur-lg')
    }

  },[showWindow])

  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    if(!student.name || !student.usn || !student.branch || !student.email || !student.phone){
      setShowMsg(true);
      setMessage({text:"Enter all fields",color:'text-red-400'});

      setTimeout(()=>{
        setShowMsg(false);
        setMessage({text:"",color:''});
      },1000)

      return 
    }

    try{
      setShowWindow(true);
      const res=await axios.post('/api/register',student);

      if(res.status!=200){
        return;
      }
      else{
        setLoad(false);
        setStudent({name:"",usn:"",branch:"",email:"",phone:"",queries:""});
      }
    }
    catch(error){
      alert("Server Error")
    }
    
  }

  return (
    <>
      <div className="relative mt-[72px] bg-gray-100 py-6 flex  justify-center sm:py-12">
      <div className="relative py-3 w-[90%] sm:max-w-xl sm:mx-auto" >
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 ioshadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-4 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto" id='form-area'>
            <div>
              <h1 className="text-3xl font-semibold text-black text-center">Ice Breaker</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative py-5">
                  <input onChange={handleChange} value={student.name} autoComplete="off" id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name " />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name of the boy</label>
                </div>
                <div className="relative py-5">
                  <input onChange={handleChange} value={student.usn} autoComplete="off" id="usn" name="usn" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="USN" />
                  <label htmlFor="usn" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">USN</label>
                </div>
                <div className="relative py-5">
                  <input onChange={handleChange} value={student.branch} autoComplete="off" id="branch" name="branch" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Branch" />
                  <label htmlFor="branch" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Branch</label>
                </div>

                <div className={`${showMsg?"":"hidden"} w-full h-[40px] text-3xl mb-3 font-bold`}>
                    <p className={`p-2 text-center wrong ${message.color}`}>{message.text}</p>
                </div>
                
                <div className="relative py-5">
                  <input onChange={handleChange} value={student.email} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                </div>
                <div className="relative py-5">
                  <input onChange={handleChange} value={student.phone} autoComplete="off" id="phone" name="phone" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Phone" />
                  <label htmlFor="phone" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone</label>
                </div>
                <div className="relative py-5">
                  <input onChange={handleChange} value={student.queries} autoComplete="off" id="queries" name="queries" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Queries" />
                  <label htmlFor="queries" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Queries for core team</label>
                </div>
 
                <div className=" text-center " onClick={handleSubmit}>
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                </div>

              </div>
            </div>
          </div>
          <div className={`${showWindow?"":"hidden"} absolute z-10  w-[90%] h-[150px] top-64 left-7`}>
                    {
                      load?
                      <div className='w-full h-full flex justify-center items-center'>
                        <Image src='/Loader.svg' width={100} height={100}></Image>
                      </div>
                      :
                      <div className='w-full h-full flex flex-col justify-between items-center bg-blue-500 rounded-3xl'>
                        <h1 className='text-center text-3xl font-bold mt-5 text-white'>Your Response was Recorded</h1>
                        <div className='flex justify-evenly w-full mb-5 '>
                          <a onClick={()=>{setShowWindow(false)}} className=' rounded-full px-3 py-2 text-white bg-red-600' href='/'>Cancel</a>
                          <a onClick={()=>{setShowWindow(false)}} className=' rounded-full px-3 py-2 text-white bg-green-500' target='_blanck' href='https://chat.whatsapp.com/He9eoOHo26rDAXFiUQul9E'>Join Whatsapp Community</a>
                        </div>
                      </div> 
                    }
          </div>
        </div>
      </div>
    </div>

    </>
  )
}
