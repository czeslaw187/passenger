import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function adminHome() {
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()

    if (!isLogged) {router.push('/admin')}

    return ( 
        <div>
            <h1>Control Panel</h1>
        </div>
     );
}

export default adminHome;