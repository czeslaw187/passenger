import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from '../../components/admin/AdminNav'
import Link from "next/link";
import { useRouter } from "next/router";

function Pwd() {
    const isLogged = useSelector(state=>state.kitchen.isLogged)    
    const router = useRouter()
    useEffect(()=>{
        if (!isLogged) {
            router.push('/admin')
        }
    },[])
    return ( 
        <>
            <AdminNav />

            <p className="hover:underline"><Link href={'/admin/home'}>{'<< Back'}</Link></p>

            <ul>

            </ul>
        </>
     );
}

export default Pwd;
