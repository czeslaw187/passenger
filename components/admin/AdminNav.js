import Link from "next/link";
import { login } from "../../lib/kitchenSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "reactstrap";

function AdminNav() {
    const router = useRouter()
    const dispatch = useDispatch()
    let date = new Date()
    date = date.toLocaleString()
    return ( 
        <div className="flex flex-row justify-between h-[4rem] items-center border-b-2 border-gray-300">
            <p>{date}</p>
            <Button outline color="danger" className="w-1/12 h-[3rem] my-3 ml-auto mr-3 border-2 transition duration-150 ease-in-out rounded-lg shadow-sm shadow-black"
                    onClick={()=>{dispatch(login(false)); router.push('/admin')}}>Sign Out</Button>
                    
        </div>
     );
}

export default AdminNav;