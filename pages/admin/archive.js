import { useSelector, useDispatch } from "react-redux";
import { getAllArchives } from "../../lib/archiveSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminNav from "../../components/admin/AdminNav";
import Link from "next/link";

function archive() {
    const dispatch = useDispatch()
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()
    useEffect(()=>{
        if (!isLogged) {
            router.push('/admin')
        }
        dispatch(getAllArchives())
    },[])
    const archives = useSelector(state=>state.archive.archive)
    console.log(archives)

    return ( 
        <>
            <AdminNav />

            <p className="hover:underline"><Link href={'/admin/home'}>{'<< Back'}</Link></p>

            <div className="max-w-full min-h-screen">
                <ul className="p-2">
                    <li className="grid grid-cols-4 justify-items-center font-bold">
                        <span>Date</span>
                        <span>Order Id</span>
                        <span>Items</span>
                        <span>Total £</span>
                    </li>
                    {
                        archives && archives.map((el,id)=>{
                            return (
                                <li key={id} className="min-w-full border-2 border-sky-500 rounded-md grid grid-cols-4 justify-items-center">
                                    <p>{el.date}</p>
                                    <p>{el.id}</p>
                                    <p>{el.items}</p>
                                    <p>{el.total}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
     );
}

export default archive;