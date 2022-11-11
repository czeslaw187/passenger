import AdminNav from "../../components/admin/AdminNav";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, clearOrders } from "../../lib/kitchenSlice";
import { io } from "socket.io-client"
import OrderList from '../../components/admin/OrderList'
import {useRouter} from 'next/router'
let socket = io()
import Link from "next/link";

function order() {
    const [prepDispatch, setPrepDispatch] = useState('prep')
    const login = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!login) {
            router.push('/admin')
        }
        const socketInitializer = async () => {
            await fetch('/api/socket');
        
            socket.on('connect', () => {
              console.log('connected')
            })
        
            socket.on('update-input', msg => {
            console.log(msg, 'msg')
            let date = new Date()
            date = date.toLocaleString()
            date = date.split(',')
                dispatch(addOrder({
                    orderId:Math.floor(Math.random() * 1000000), 
                    orderArr:msg,
                    date: date,
                    state: 'prep'
                }))
            })
          }
        socketInitializer()
      }, [])
      const recent = useSelector(state=>state.kitchen.orderArray)

      console.log(recent, 'recent')
    return ( 
        <>
            <AdminNav />
            <p className="hover:underline"><Link href={'/admin/home'}>{'<< Back'}</Link></p>
            <div className="max-w-full m-2 h-[3rem] border-2 border-sky-400 flex flex-row justify-around items-center shadow-sm shadow-black">
                <button className={prepDispatch == 'prep' ?
                                   "w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black bg-sky-500" :
                                   "w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"}
                        onClick={()=>{setPrepDispatch('prep')}}>Cook</button>
                <button className={prepDispatch == 'dispatch' ?
                                   "w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black bg-sky-500" :
                                   "w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"}
                        onClick={()=>{setPrepDispatch('dispatch')}}>Dispatch</button>
                <button className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"
                        onClick={()=>{dispatch(clearOrders())}}>Clear Orders</button>
            </div>
            <div className="max-w-full min-h-screen mx-1 mt-1 border-2 border-sky-400">
                <ul className="flex flex-row flex-wrap">
                    {
                        recent && recent.map((el, id)=>{
                            return (
                                <OrderList key={id} el={el} id={id} />
                            )
                        })
                    }  
                </ul>
            </div>
        </>
     );
}

export default order;