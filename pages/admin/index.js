import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchCredentials } from "../../lib/kitchenSlice";

function admin() {
    const router = useRouter()
    const [input, setInput] = useState([])
    const {isLogged, logError} = useSelector(state=>state.kitchen)
    const kitchen = useSelector(state=>state.kitchen)
    useEffect(()=>{
        if (isLogged) {
            router.push('/admin/home')
        } 
    },[isLogged])
    const dispatch = useDispatch()
    console.log(kitchen, 'login')

    const handleChange =(e) => {
        const name = e.target.name
        const value = e.target.value
        setInput(values=>({...values, [name]:value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchCredentials(input))
    }

    return ( 
        <div>
            <p className="hover:underline"><Link href={'/'}>{'<< Back'}</Link></p>
            <div className="flex h-screen">
                <form className="m-auto w-4/12 h-[20rem] border-4 rounded-md border-slate-300 shadow-xl shadow-black flex flex-col items-center">
                    <p className="m-0 text-red-500 text-lg">{kitchen.logError}</p>
                    <label className="my-3 text-lg" htmlFor="login">Login</label>
                    <input onChange={(e)=>{handleChange(e)}} 
                           className="w-9/12 h-[2rem] shadow-sm shadow-black" 
                           type="text" 
                           id="login" 
                           name="login" 
                           placeholder="Enter your login..." 
                           value={input.login || ''}
                           required />
                    <label className="my-3 text-lg" htmlFor="password">Password</label>
                    <input onChange={(e)=>{handleChange(e)}} 
                           className="w-9/12 h-[2rem] shadow-sm shadow-black" 
                           type="password" 
                           id="password" 
                           name="password" 
                           placeholder="Enter your password..." 
                           value={input.password || ''}
                           required />
                    <button type="submit" 
                            onClick={(e)=>{setInput({login:'',password:''}); handleSubmit(e)}} 
                            className="my-5 w-4/12 h-[3rem] border-2 border-slate-500 rounded-md transition duration-150 ease-in-out hover:bg-slate-500 active:bg-slate-300 hover:text-white">Submit</button>
                </form>
            </div>
        </div>
     );
    
}

export default admin;