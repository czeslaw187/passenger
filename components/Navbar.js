import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import { resetOrder } from "../lib/newSlice";

function Navbar() {
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()
    const myOrder = useSelector(state=>state.food.order)
    return ( 
        <>
            <div className=" flex flex-row items-center justify-between min-w-screen h-[4rem] bg-gradient-to-bl from-blue-400 to-slate-50">
                <a onClick={()=>{dispatch(resetOrder())}} href="#" className="mx-4">Passenger</a>
                <button className={myOrder.length > 0 ? "mr-5" : 'hidden'}><FontAwesomeIcon icon={faClipboard} size='2xl'/></button>
            </div>
            <div className="w-full h-0">
                <p>dropdown</p>
            </div>
        </>
     );
}

export default Navbar;