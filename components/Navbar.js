import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import { resetOrder, removeItem } from "../lib/newSlice";
import Link from "next/link";
import axios from 'axios'
import { Collapse, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
function Navbar() {
    const myOrder = useSelector(state=>state.food.order)
    const [theOrder, setTheOrder] = useState(myOrder)
    const [isOpen,setIsOpen] = useState(false)

    const toggle =()=> {
        setIsOpen(!isOpen)
    }
    
    useEffect(()=>{
        setTheOrder(myOrder)
    },[myOrder])
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = useState(false)

    const sendOrder = async (order) => {
        await axios.post('/api/socket',{message: order})
        dispatch(resetOrder())
    }

    return ( 
        <>
            <div className=" flex flex-row items-center justify-between min-w-screen h-[4rem] bg-gradient-to-bl from-blue-400 to-slate-50 text-black">
                <div className="flex flex-row items-center">
                    <a href="#" className="mx-4 text-teal-600 no-underline font-bold">Passenger</a>
                    <Button 
                    outline
                    size="xl"
                    className="ml-5 text-center shadow-md shadow-slate-400"
                    color="success">
                        <Link href={'/admin'} className="no-underline">
                            <p className="m-1 text-lime-500 text-xl font-bold font-serif">Admin</p>
                        </Link>
                    </Button>
                </div>
                <button onClick={()=>{toggle()}} className={theOrder.length > 0 ? "mr-5" : "hidden"}>
                    <FontAwesomeIcon icon={faClipboard} size='2xl'/>
                    <span className="relative right-10 text-orange-700 font-bol text-lg">{theOrder && theOrder.length}</span>
                </button>
            </div>
            <Collapse isOpen={isOpen}>
                <ul className="bg-gradient-to-br from-indigo-100 to-amber-100 text-black p-0 border-2 border-slate-500">
                    {
                        theOrder && theOrder.map((el,id)=>{
                            return (
                                <li id={id}>
                                    <Card className="w-11/23 h-[5rem] shadow-md shadow-black m-1 hover:underline">
                                        <CardBody className="grid grid-cols-3">
                                            <CardTitle>
                                                {el.item}
                                            </CardTitle>
                                            <CardText className="text-center">
                                                £{parseInt(el.price).toFixed(2)}
                                            </CardText>
                                            <CardText className="text-end">
                                                <Button close
                                                        onClick={()=>{dispatch(removeItem(el.id))}}></Button>
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </li>
                            )
                        })
                    }
                    <p className={theOrder.length > 0 ? "text-right mr-[5rem] text-xl" : "hidden"}>Total: £{theOrder.reduce((total,sum)=>{return total + parseInt(sum.price)},0).toFixed(2)}</p>
                    <div className={theOrder.length > 0 ? "flex flex-row justify-end items-center" : "hidden"}>
                        <Button 
                        outline
                        color="secondary"
                        onClick={()=>{dispatch(resetOrder()); setTheOrder([])}} 
                        className="m-5 w-2/12 h-[5rem] font-bold text-xl border-2">
                            Clear
                        </Button>
                        <Button 
                        outline
                        color="secondary"
                        className="m-5 w-2/12 h-[5rem] font-bold text-xl border-2"
                        onClick={()=>{sendOrder(theOrder)}}>
                            Send
                        </Button>
                    </div>
                </ul>
            </Collapse>
        </>
     );
}

export default Navbar;