import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import { resetOrder, removeItem } from "../lib/newSlice";

function Navbar() {
    const myOrder = useSelector(state=>state.food.order)
    const [theOrder, setTheOrder] = useState([])
    useEffect(()=>{
        setTheOrder(myOrder)
    },[myOrder])
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState(false)
    console.log(myOrder, 'the order')
    return ( 
        <>
            <div className=" flex flex-row items-center justify-between min-w-screen h-[4rem] bg-gradient-to-bl from-blue-400 to-slate-50">
                <a href="#" className="mx-4">Passenger</a>
                <button onClick={()=>{setDropdown(!dropdown)}} className={theOrder.length > 0 ? "mr-5" : "hidden"}>
                    <FontAwesomeIcon icon={faClipboard} size='2xl'/>
                    <span className="relative right-10 text-orange-700 font-bol text-lg">{theOrder && theOrder.length}</span>
                </button>
            </div>
            <div>
                <ul className={dropdown ? 'animate-opac bg-gradient-to-br from-indigo-100' : "w-full h-0 opacity-0 hidden"}>
                    {
                        theOrder && theOrder.map((el,id)=>{
                            return (
                                <li key={id} className="text-2xl space-y-5 ml-2 grid grid-cols-3 hover:underline items-baseline">
                                    <p>{el.item}</p>
                                    <p className="text-right">£{el.price.toFixed(2)}</p>
                                    <button type="close" onClick={()=>{dispatch(removeItem(el.id))}} className="active:scale-75 transition ease-in-out duration-200">X</button>
                                </li>
                            )
                        })
                    }
                    <p className={theOrder.length > 0 ? "text-right mr-[5rem] text-xl" : "hidden"}>Total: £{theOrder.reduce((total,sum)=>{return total + sum.price},0).toFixed(2)}</p>
                    <div className={theOrder.length > 0 ? "flex flex-row justify-end items-center" : "hidden"}>
                        <button 
                        onClick={()=>{dispatch(resetOrder()); setTheOrder([])}} 
                        className="m-5 w-2/12 border-2 border-indigo-500 p-5 rounded-md transition ease-in-out duration-150 active:bg-indigo-200">Clear</button>
                        <button className="m-5 w-2/12 border-2 border-indigo-500 p-5 rounded-md transition ease-in-out duration-150 active:bg-indigo-200">Send</button>
                    </div>
                </ul>
            </div>
        </>
     );
}

export default Navbar;