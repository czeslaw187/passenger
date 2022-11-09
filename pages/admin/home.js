import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../../lib/kitchenSlice";
import Link from "next/link";

function adminHome() {
    const dispatch = useDispatch()
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()

    if (!isLogged) {router.push('/admin')}

    return ( 
        <div>
            <div className="flex flex-row justify-between">
                <h1 className="m-2 hover:underline">
                    <Link href={'/'}>{'<< Back'}</Link>
                </h1>
                <button className="w-1/12 h-[3rem] m-3 border-2 border-sky-500 transition duration-150 ease-in-out rounded-lg hover:bg-sky-500 active:bg-sky-300"
                        onClick={()=>{dispatch(login(false))}}>Sign Out</button>
            </div>
        </div>
     );
}

export default adminHome;