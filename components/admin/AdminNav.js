import Link from "next/link";
import { login } from "../../lib/kitchenSlice";
import { useDispatch } from "react-redux";

function AdminNav() {
    const dispatch = useDispatch()
    let date = new Date()
    date = date.toLocaleString()
    return ( 
        <div className="flex flex-row justify-between h-[4rem] border-b-4 border-sky-400 items-center">
            <h1 className="m-2 hover:underline">
                <Link href={'/'}>{'<< Back'}</Link>
            </h1>
            <p>{date}</p>
            <button className="w-1/12 h-[3rem] m-3 border-2 border-sky-500 transition duration-150 ease-in-out rounded-lg hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"
                    onClick={()=>{dispatch(login(false))}}>Sign Out</button>
        </div>
     );
}

export default AdminNav;