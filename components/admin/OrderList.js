import { useDispatch } from "react-redux";
import { removeOrder } from "../../lib/kitchenSlice";
import OrderItem from "./OrderItem";
import { changeState } from "../../lib/kitchenSlice";
import { insertArchive } from "../../lib/archiveSlice";
import { Card, CardHeader, CardBody, Button, ListInlineItem, CardText, CloseButton } from "reactstrap";
import { useState } from "react";

function OrderList({el, id}) {
    const dispatch = useDispatch()
    const [max,setMax] = useState(false)
    const toggleMax =()=> {
        setMax(!max)
    }
    console.log(max)
    return ( 
        <ListInlineItem key={id} id={el.orderId}>
            <Card className={toggleMax ? 'w-[40rem] h-3/6 align-top my-3 transition duration-400 ease-in-out' : 'w-[20rem] h-3/6 align-top my-3'}>
                <CardHeader className="flex flex-row flex-wrap justify-between pr-0">
                    <CardText className="w-4/12">
                        id: {el.orderId}
                    </CardText>
                    {el.state == 'prep' ? <Button outline onClick={toggleMax} className="border-none ml-auto">M</Button> : null}
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
        </ListInlineItem>
     );
}

export default OrderList;