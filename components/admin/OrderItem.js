import { useState } from "react";

function OrderItem({it, id}) {
    const [marked, setMarked] = useState(false)
    return ( 
        <li key={id} id={it.id} onClick={()=>{setMarked(!marked)}} className={marked ? 'bg-yellow-400 flex flex-row pb-1' : 'flex flex-row pb-1'}>
            <span className="mr-1">{id}</span>
            <p>{it.item}</p>
        </li>
     );
}

export default OrderItem;