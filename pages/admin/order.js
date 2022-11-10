import AdminNav from "../../components/admin/AdminNav";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, clearOrders } from "../../lib/kitchenSlice";
import { io } from "socket.io-client"
let socket = io()

function order() {
    const dispatch = useDispatch()
    useEffect(() => {
        const socketInitializer = async () => {
            await fetch('/api/socket');
        
            socket.on('connect', () => {
              console.log('connected')
            })
        
            socket.on('update-input', msg => {
            console.log(msg, 'msg')
                dispatch(addOrder(msg))
            })
          }
        socketInitializer()
      }, [])
      const recent = useSelector(state=>state.kitchen.orderArray)

      console.log(recent, 'recent')
    return ( 
        <>
            <AdminNav />
            <div className="max-w-full m-2 h-[3rem] border-2 border-sky-400 flex flex-row justify-around items-center shadow-sm shadow-black">
                <button className="w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"
                        onClick={()=>{dispatch(clearOrders())}}>Clear Orders</button>
            </div>
            <div className="max-w-full min-h-screen mx-1 mt-1 border-2 border-sky-400">
                <ul>
                    {
                        recent && recent.map((el, id)=>{
                            return (
                                <li key={id} id={el.id} className="w-3/12 h-3/6 border-2 border-sky-500">
                                    <p>{el.item}</p>
                                </li>
                            )
                        })
                    }  
                </ul>
            </div>
        </>
     );
}

export default order;