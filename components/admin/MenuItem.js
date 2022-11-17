import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function MenuItem({el}) {
    return ( 
        <li className="w-full h-[4rem] hover:h-[10rem] border-2 border-sky-500 rounded-sm mb-5 shadow-md grid grid-cols-3 items-center justify-between">
            <p className="w-full text-lg">{el.name}</p>
            <p className="h-full overflow-hidden p-1 scrollbar hover:scrollbar-thin">{el.description}</p>
            <div className="flex flex-col justify-start items-end">
                <button className="hover:text-orange-500 active:scale-75 m-1">
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
                <button className="hover:text-orange-500 active:scale-75 m-1">
                    <FontAwesomeIcon icon={faTrash} size="xl" />
                </button>
            </div>
        </li>
     );
}

export default MenuItem;