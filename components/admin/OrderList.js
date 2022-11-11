import { useDispatch } from "react-redux";
import { removeOrder } from "../../lib/kitchenSlice";
import OrderItem from "./OrderItem";
import { changeState } from "../../lib/kitchenSlice";

function OrderList({el, id}) {
    const dispatch = useDispatch()

    return ( 
        <li key={id} id={el.orderId} className="w-3/12 h-3/6 border-2 border-sky-500">
            <div className={el.state == 'prep' ?
                            "w-full border-b-4 border-sky-500 grid grid-cols-2 grid-rows-2 items-center px-1" :
                            "w-full border-b-4 border-sky-500 grid grid-cols-3 grid-rows-2 items-center px-1"}>
                <p>id: {el.orderId}</p>
                <button type="close" 
                        className={el.state == 'prep' ? "text-2xl text-right font-bold transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-400" :
                                   "hidden"}
                        onClick={()=>{dispatch(changeState([el.orderId, 'dispatch']))}}>x</button>
                <button className={el.state == 'dispatch' ? "text-2xl text-right font-bold transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-400" :
                                   "hidden"}
                        onClick={()=>{dispatch(changeState([el.orderId, 'prep']))}}>{'<--'}</button>
                <button className={el.state == 'dispatch' ? "text-2xl text-right font-bold transition duration-150 ease-in-out hover:text-gray-500 active:text-gray-400" :
                                   "hidden"}
                        onClick={()=>{dispatch(removeOrder(el.orderId))}}>x</button>
                <p>{el.date[1]}</p>
            </div>
            <ul className="bg-indigo-300">
                {
                    el.orderArr.map((it,id)=>{
                        return (
                            <OrderItem key={id} it={it} id={id} />
                        )
                    })
                }
            </ul>
        </li>
     );
}

export default OrderList;