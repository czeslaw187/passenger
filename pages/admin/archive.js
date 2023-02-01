import { useSelector, useDispatch } from "react-redux";
import { getAllArchives } from "../../lib/archiveSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import Link from "next/link";

function Archive() {
    const [date, setDate] = useState('')
    const dispatch = useDispatch()
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()
    useEffect(()=>{
        if (!isLogged) {
            router.push('/admin')
        }
        dispatch(getAllArchives())
    },[])

    let archives = useSelector(state=>state.archive.archive)    

    if (date && archives) {
        archives = archives.filter(el=>{
            let theDay = el.date.split(' ')
            theDay = theDay[0]
            theDay = theDay.split('/')
            let compareDay = date.split('-')
            console.log(theDay, compareDay, 'day')
            return theDay[0] == compareDay[1] && theDay[1] == compareDay[2] && theDay[2] == compareDay[0]
        })
    } else {
        archives && archives.length > 0 ? archives.filter(el=>{
            let today = new Date()
            today = today.toLocaleString()
            today = today.split(' ')
            today = today[0]
            today = today.split('/')
            let past = el.date.split(' ')
            past = past[0]
            past = past.split('/')
            return past[0] == today[0] 
        }) : null
    }
    
    return ( 
        <div className="text-black">
            <AdminNav />

            <p className="hover:underline"><Link href={'/admin/home'}>{'<< Back'}</Link></p>

            <div className="max-w-full flex flex-row justify-center space-x-4 mb-[4rem]">
                <label htmlFor="date">Choose date</label>
                <input className="bg-indigo-300" 
                       onChange={(e)=>{setDate(e.target.value)}} 
                       type="date" 
                       id="date" 
                       name="date" 
                       placeholder="choose day..." 
                       value={date || ''}/>
            </div>

            <div className="max-w-full min-h-screen">
                <ul className="p-2">
                    <li className="grid grid-cols-4 justify-items-center font-bold">
                        <span>Date</span>
                        <span>Order Id</span>
                        <span>Items</span>
                        <span>Total £</span>
                    </li>
                    {
                        archives && archives.length > 0 ? archives.map((el,id)=>{
                            return (
                                <li key={id} className="min-w-full mb-1 h-[4rem] border-2 border-sky-500 rounded-md grid grid-cols-4 justify-items-center">
                                    <p>{el.date}</p>
                                    <p>{el.id}</p>
                                    <p className="overflow-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-300 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">{el.items}</p>
                                    <p>{el.total}</p>
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
        </div>
     );
}

export default Archive;