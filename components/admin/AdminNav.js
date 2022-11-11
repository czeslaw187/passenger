import Link from "next/link";
import { login } from "../../lib/kitchenSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function AdminNav() {
    const router = useRouter()
    const dispatch = useDispatch()
    let date = new Date()
    date = date.toLocaleString()
    return ( 
        <div className="flex flex-row justify-between h-[4rem] border-b-4 border-sky-400 items-center">
            <p>{date}</p>
            <button className="w-1/12 h-[3rem] m-3 border-2 border-sky-500 transition duration-150 ease-in-out rounded-lg hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"
                    onClick={()=>{dispatch(login(false)); router.push('/admin')}}>Sign Out</button>
        </div>
     );
}

export default AdminNav;