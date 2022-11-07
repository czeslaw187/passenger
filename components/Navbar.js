import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import { resetOrder } from "../lib/newSlice";

function Navbar(props) {
    const myOrder = useSelector(state=>state.food.order)
    const [theOrder, setTheOrder] = useState([])
    useEffect(()=>{
        setTheOrder(myOrder)
    },[myOrder])
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState(false)
    return ( 
        <>
            <div className=" flex flex-row items-center justify-between min-w-screen h-[4rem] bg-gradient-to-bl from-blue-400 to-slate-50">
                <a onClick={()=>{dispatch(resetOrder()); setTheOrder([])}} href="#" className="mx-4">Passenger</a>
                <button onClick={()=>{setDropdown(!dropdown)}} className="mr-5">
                    <FontAwesomeIcon icon={faClipboard} size='2xl'/>
                    <span className="relative right-10 text-orange-700 font-bol text-lg">{theOrder && theOrder.length}</span>
                </button>
            </div>
            <div>
                <ul className={dropdown ? 'animate-opac bg-gradient-to-br from-indigo-100' : "w-full h-0 opacity-0"}>
                    {
                        theOrder && theOrder.map((el,id)=>{
                            return (
                                <li key={id} className="text-2xl space-y-5 ml-2 grid grid-cols-2 hover:underline">
                                    <p>{el.item}</p>
                                    <button type="close" className="active:scale-75 transition ease-in-out duration-200">X</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
     );
}

export async function getStaticProps(context) {
    const myOrder = useSelector(state=>state.food.order)
    console.log(context, 'context')
    
    return {
        props: {
            myOrder
        }
    }
}

export default Navbar;