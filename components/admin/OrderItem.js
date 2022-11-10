import { useState } from "react";

function OrderItem({it, id}) {
    const [marked, setMarked] = useState(false)
    return ( 
        <li key={id} id={it.id} onClick={()=>{setMarked(!marked)}} className={marked ? 'bg-yellow-400' : null}>
            {it.item}
        </li>
     );
}

export default OrderItem;