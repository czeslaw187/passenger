import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminNav from "../../components/admin/AdminNav";
import Link from "next/link";

function archive() {
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

            <div>
                archive
            </div>
        </>
     );
}

export default archive;