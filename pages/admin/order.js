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
    const [yesNo, setYesNo] = useState(false)
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
                    state: 'prep',
                    total: msg.reduce((tot,sum)=>{return tot + parseInt(sum.price)}, 0).toFixed(2)
                }))
            })
          }
        socketInitializer()
      }, [])
      const recent = useSelector(state=>state.kitchen.orderArray)
      const prepArr = recent.filter(el=>el.state == 'prep')
      const dispatchArr = recent.filter(el=>el.state == 'dispatch')
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
                        onClick={()=>{setYesNo(!yesNo)}}>Clear Orders</button>
                <div className={yesNo ? "animate-show absolute min-w-screen min-h-screen flex" : "hidden"}>
                    <div className="relative m-auto w-[15rem] h-[8rem] bg-amber-100 border-2 rounded-md text-center flex flex-col justify-center">
                        <p className="mx-auto text-lg">Are you sure ?</p>
                        <div className="space-x-4">
                            <button className="hover:underline" onClick={()=>{dispatch(clearOrders()); setYesNo(!yesNo)}}>Yes</button>
                            <button className="hover:underline" onClick={()=>{setYesNo(!yesNo)}}>No</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-full min-h-screen mx-1 mt-1 border-2 border-sky-400">
                <ul className="flex flex-row flex-wrap">
                    {
                        prepDispatch == 'prep' ? prepArr.map((el, id)=>{
                            return (
                                <OrderList key={id} el={el} id={id} />
                            )
                        }) : dispatchArr.map((el, id)=>{
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