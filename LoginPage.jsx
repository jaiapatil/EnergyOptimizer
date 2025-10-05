import React, { useState } from 'react'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom';

const LoginPage = ({setUser, setToken}) => {

    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login form submitted:", { name, email, password });
        const res = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password}),
        });

        const data = await res.json();

        if(res.ok){
            setUser(data.companyData);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            navigate("/dashboard")
        }else{
            alert(data.message);
        }
    }

    

  return (
    <form onSubmit={handleSubmit}>
    <div className='h-[600px] flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center h-[600px] w-screen px-30 py-20 bg-gradient-to-br from-[#0B0F1A] to-lime-700'>
            <div className='mb-10'>
            <h1 className='text-4xl font-bold text-green-700  '>Login </h1>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Company Name : </label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='bg-transparent mb-3 w-[400px] px-3 py-1 rounded-lg outline-none border-1 border-slate-400 placeholder:text-gray-500' 
                    placeholder='Enter company name'   
                />
            </div>
            <div className='flex flex-col'> 
                <label htmlFor="email">Email : </label>
                <input 
                    type="email" 
                    name='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-transparent mb-3 w-[400px] px-3 py-1 rounded-lg outline-none border-1 border-slate-400 placeholder:text-gray-500'
                    placeholder='Enter Email'
                />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password : </label>
                <input 
                    type="password" 
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-transparent mb-3 w-[400px] px-3 py-1 rounded-lg outline-none border-1 border-slate-400 placeholder:text-gray-500'
                    placeholder='Enter verification password'
                />
            </div>
            <Button type="submit" variant="ghost"  className='bg-transparent border-1 mt-5 cursor-pointer w-[400px]' children="Start with Optimization"></Button>

        </div>
    </div>
    </form>
  )
}

export default LoginPage