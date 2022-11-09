import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchCredentials } from "../../lib/kitchenSlice";

function admin() {
    const router = useRouter()
    const [input, setInput] = useState([])
    const {isLogged, logError} = useSelector(state=>state.kitchen)
    const kitchen = useSelector(state=>state.kitchen)
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

    if (isLogged) {
        router.push('/admin/home')
    } else {
        return ( 
            <div>
                <p className="hover:underline"><Link href={'/'}>{'<< Back'}</Link></p>
                <div className="flex h-screen">
                    <form className="m-auto w-4/12 h-[14rem] border-4 rounded-md border-slate-300 shadow-xl shadow-black flex flex-col items-center">
                        <p className="mx-auto text-red-500 text-lg">{kitchen.logError}</p>
                        <label className="my-3 text-lg" htmlFor="login">Login</label>
                        <input onChange={(e)=>{handleChange(e)}} 
                               className="w-9/12 h-1/6 shadow-sm shadow-black" 
                               type="text" 
                               id="login" 
                               name="login" 
                               placeholder="Enter your login..." 
                               required />
                        <label className="my-3 text-lg" htmlFor="password">Password</label>
                        <input onChange={(e)=>{handleChange(e)}} 
                               className="w-9/12 h-1/6 shadow-sm shadow-black" 
                               type="text" 
                               id="password" 
                               name="password" 
                               placeholder="Enter your password..." 
                               required />
                        <button onClick={(e)=>{handleSubmit(e)}} className="my-2 w-3/12 border-2 border-slate-500 rounded-md transition duration-150 ease-in-out hover:bg-slate-500 active:bg-slate-300 hover:text-white">Submit</button>
                    </form>
                </div>
            </div>
         );
    }

    
}

export default admin;