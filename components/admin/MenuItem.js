import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function MenuItem({el, edit, setEdit, delPop, setDelPop}) {
    return ( 
        <li className="w-full h-[5rem] hover:h-fit hover:text-ellipsis border-2 border-sky-500 rounded-sm mb-5 shadow-md grid grid-cols-3 items-center justify-between transition duration-200 ease-in-out">
            <p className="w-full text-lg">{el.name}</p>
            <p className="h-full overflow-hidden scrollbar hover:scrollbar-thin text-justify">{el.description}</p>
            <div className="flex flex-col justify-start items-end">
                <button className="hover:text-orange-500 active:scale-75 m-1"
                        onClick={()=>{setEdit(!edit)}}>
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
                <button className="hover:text-orange-500 active:scale-75 m-1"
                        onClick={()=>{setDelPop(!delPop)}}>
                    <FontAwesomeIcon icon={faTrash} size="xl" />
                </button>
            </div>
        </li>
     );
}

export default MenuItem;