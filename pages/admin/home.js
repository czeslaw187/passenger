import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AdminNav from "../../components/admin/AdminNav";
import { useEffect } from "react";

function adminHome() {
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()
    useEffect(()=>{
        if (!isLogged) {router.push('/admin')}
    },[isLogged])

    return ( 
        <div>
            <AdminNav />
            <div className="max-w-full min-h-screen overflow-auto flex flex-row flex-wrap">
                <button 
                onClick={()=>{router.push('/admin/order')}}
                className="w-[10rem] h-[10rem] border-4 rounded-md border-sky-300 m-5 flex transition duration-150 ease-in-out hover:scale-110 active:scale-100 shadow-md shadow-black">
                    <p className="m-auto">Orders</p>
                </button>
                <button 
                onClick={()=>{router.push('/admin/archive')}}
                className="w-[10rem] h-[10rem] border-4 rounded-md border-sky-300 m-5 flex transition duration-150 ease-in-out hover:scale-110 active:scale-100 shadow-md shadow-black">
                    <p className="m-auto">Archive</p>
                </button>
                <button 
                onClick={()=>{router.push('/admin/menu')}}
                className="w-[10rem] h-[10rem] border-4 rounded-md border-sky-300 m-5 flex transition duration-150 ease-in-out hover:scale-110 active:scale-100 shadow-md shadow-black">
                    <p className="m-auto">Menu</p>
                </button>
                <button 
                onClick={()=>{router.push('/admin/pwd')}}
                className="w-[10rem] h-[10rem] border-4 rounded-md border-sky-300 m-5 flex transition duration-150 ease-in-out hover:scale-110 active:scale-100 shadow-md shadow-black">
                    <p className="m-auto">Change Password</p>
                </button>
            </div>
        </div>
     );
}

export default adminHome;