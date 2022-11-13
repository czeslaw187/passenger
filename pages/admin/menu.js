import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from '../../components/admin/AdminNav'
import Link from "next/link";
import { useRouter } from "next/router";

function menu() {
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    let theMenu = useSelector(state=>state.food.food)
    const [category, setCategory] = useState('')
    console.log(theMenu, category)
    const router = useRouter()
    useEffect(()=>{
        if (!isLogged) {
            router.push('/admin')
        }
    },[])
    if (category) {
        theMenu = theMenu.filter(el=>{ return el.category == category}) 
    }
    return ( 
        <>
            <AdminNav />

            <p className="hover:underline"><Link href={'/admin/home'}>{'<< Back'}</Link></p>

            <div className="max-w-full m-2 h-[3rem] border-2 border-sky-400 flex flex-row flex-wrap justify-around items-center shadow-sm shadow-black">
                <button id="All" 
                        onClick={(e)=>{setCategory('')}}
                        className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black">
                    All
                </button>
                <button id="Starter" 
                        onClick={(e)=>{setCategory(e.target.id)}}
                        className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black">
                    Starters
                </button>
                <button id="Main" 
                        onClick={(e)=>{setCategory(e.target.id)}}
                        className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black">
                    Main
                </button>
                <button id="Salad" 
                        onClick={(e)=>{setCategory(e.target.id)}}
                        className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black">
                    Salad
                </button>
                <button id="Side" 
                        onClick={(e)=>{setCategory(e.target.id)}}
                        className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black">
                    Side
                </button>
            </div>
            <ul className="max-w-full m-2">
                {
                   theMenu && theMenu.map((el,id)=>{
                    return (
                        <li key={id} className="max-w-full h-[4rem] p-1 m-2 border-2 border-sky-400 shadow-sm shadow-black flex items-center justify-between">
                            <p className="text-lg">{el.name}</p>
                            <p className="text-lg font-bold">£{el.price}</p>
                        </li>
                    ) 
                   })
                }
            </ul>
        </>
     );
}

export default menu;
