import AdminNav from "../../components/admin/AdminNav";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, clearOrders } from "../../lib/kitchenSlice";
import OrderList from '../../components/admin/OrderList'
import {useRouter} from 'next/router'
import Pusher from 'pusher-js'
import Link from "next/link";
import { Button, Nav, NavItem, Navbar, List, Container } from "reactstrap";
import ClearOrders from "../../components/admin/ClearOrders";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Order() {
    const recent = useSelector(state=>state.kitchen.orderArray)
    const prepArr = recent.filter(el=>el.state == 'prep').reverse()
    const dispatchArr = recent.filter(el=>el.state == 'dispatch').reverse()
    const [itemList,setItemList] = useState(recent)
    const [prepDispatch, setPrepDispatch] = useState('prep')
    const [yesNo, setYesNo] = useState(false)
    const login = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!login) {
            router.push('/admin')
        }
        const pusher = new Pusher((process.env.NEXT_PUBLIC_PUSHER_KEY), {
            cluster: 'eu'
        })
        const channel = pusher.subscribe('chat')
        channel.bind('chat-event', function(data) {
            let date = new Date()
            date = date.toLocaleString()
            date = date.split(',')
                dispatch(addOrder({
                    orderId:Math.floor(Math.random() * 1000000), 
                    orderArr:data.message,
                    date: date,
                    state: 'prep',
                    total: data.message.reduce((tot,sum)=>{return tot + parseInt(sum.price)}, 0).toFixed(2)
                }))
        })
    }, [])
    
    const handleDrop = (droppedItem) => {
        if (!droppedItem.destination) return;
        var updatedList = [...itemList];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        setItemList(updatedList);
    };

    return ( 
        <>
            <AdminNav />

            <Link className="text-lg text-black no-underline font-serif hover:font-bold hover:underline" href={'/admin/home'}>{'<< Back'}</Link>

            <Navbar>
                <Nav navbar className="m-2 w-full h-[6rem] flex-row justify-around items-center shadow-sm shadow-black font-serif">
                    <NavItem className="w-4/12 md:w-3/12">
                        <Button className="w-full h-[4rem] m-1 shadow-sm shadow-black font-bold"
                                outline
                                active={prepDispatch == 'prep' ? true : false}
                                color="primary"
                                onClick={()=>{setPrepDispatch('prep')}}>Cook</Button>
                    </NavItem>
                    <NavItem className="w-4/12 md:w-3/12">
                        <Button className="w-full h-[4rem] m-1 shadow-sm shadow-black font-bold"
                                outline
                                active={prepDispatch == 'dispatch' ? true : false}
                                color="primary"
                                onClick={()=>{setPrepDispatch('dispatch')}}>Dispatch</Button>
                    </NavItem>
                    <NavItem className="w-4/12 md:w-3/12">
                        <ClearOrders setYesNo={setYesNo} clearOrders={clearOrders} yesNo={yesNo}/>        
                    </NavItem>
                </Nav>
            </Navbar>

            <div className="mt-1 px-0 py-1 mx-1">
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container" direction="horizontal" className="flex">
                        {(provided)=>{
                            return(<div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {
                                prepDispatch == 'prep' ? prepArr.map((el, id)=>{
                                    return (
                                        <Draggable key={el.orderId}draggableId={el.orderId.toString()} index={id}>
                                            {(provided) => {return(
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                >
                                                    <OrderList key={id} el={el} id={id} />
                                                </div>
                                            )}}
                                        </Draggable>
                                    )
                                }) : dispatchArr.map((el, id)=>{
                                    return (
                                        <Draggable key={el.orderId} draggableId={el.orderId.toString()} index={id}>
                                            {(provided) => {return(
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                >
                                                    <OrderList key={id} el={el} id={id} />
                                                </div>
                                            )}}
                                        </Draggable>
                                    )
                                })
                            }   
                            {provided.placeholder}    
                          </div>)
                        }}
                    
                    </Droppable>
                </DragDropContext>
            </div>
        </>
     );
}

export default Order;