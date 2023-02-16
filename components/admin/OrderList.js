import { useDispatch } from "react-redux";
import { removeOrder } from "../../lib/kitchenSlice";
import OrderItem from "./OrderItem";
import { changeState } from "../../lib/kitchenSlice";
import { insertArchive } from "../../lib/archiveSlice";
import { Card, CardHeader, CardBody, Button, ListInlineItem, CardText, CloseButton } from "reactstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function OrderList({el, id, dragStart, dragEnter, drop}) {
    const dispatch = useDispatch()
    const [max,setMax] = useState(false)
    const toggleMax =()=> {
        setMax(!max)
    }
    return ( 
        <div key={id} 
             id={el.orderId} 
             className="w-3/12 m-0 h-fit" 
             draggable 
             onDragStart={(e)=>{dragStart(e, id)}}
             onDragEnter={(e)=>{dragEnter(e, id)}}
             onDragEnd={drop}>
            <Card className={max ? "absolute scale-x-[2] scale-y-[2] z-[1000] left-[2rem] top-[2rem] translate-x-[50%] translate-y-[50%] transition duration-300 ease-in-out" : 'w-full align-top my-3'}>
                <CardHeader className="flex flex-row flex-wrap justify-between pr-0">
                    <CardText>
                        id: {el.orderId}
                    </CardText>
                    {el.state == 'prep' ? <Button outline onClick={toggleMax} className="border-none ml-auto pt-0 mb-auto"><FontAwesomeIcon icon={faMagnifyingGlass}/></Button> : null}
                    {el.state == 'prep' ? 
                        <CloseButton type="close" className="ml-auto w-3/12" onClick={()=>{dispatch(changeState([el.orderId, 'dispatch']))}}/> : 
                     el.state == 'dispatch' ?
                     <Button className="w-3/12 border-none hover:text-xl"
                             outline
                             onClick={()=>{dispatch(changeState([el.orderId, 'prep']))}}>{'<--'}</Button> : null
                    }
                    {el.state == "dispatch" ? <CloseButton className="w-3/12 justify-end" onClick={()=>{dispatch(insertArchive(el)); dispatch(removeOrder(el.orderId))}} /> : null }
                    <CardText className="w-6/12">{el.date[1]}</CardText>
                </CardHeader>
                <CardBody>
                    <ul className="bg-indigo-300">
                        {
                            el.orderArr.map((it,id)=>{
                                return (
                                    <OrderItem key={id} it={it} id={id} />
                                )
                            })
                        }
                    </ul>
                </CardBody>
            </Card>
        </div>
     );
}

export default OrderList;