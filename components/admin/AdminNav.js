import Link from "next/link";
import { login } from "../../lib/kitchenSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Button, Nav, NavItem } from "reactstrap";

function AdminNav() {
    const router = useRouter()
    const dispatch = useDispatch()
    let date = new Date()
    date = date.toLocaleString()
    return ( 
        <Nav className="border-b-2 border-gray-300 items-center px-3 justify-between">
            <NavItem>
                {date}
            </NavItem>
            <NavItem>
                <Button outline color="danger" 
                        className="w-full h-[3rem] my-3 border-2 transition duration-150 ease-in-out rounded-lg shadow-sm shadow-black"
                        onClick={()=>{dispatch(login(false)); router.push('/admin')}}>Sign Out</Button>
            </NavItem>    
        </Nav>
     );
}

export default AdminNav;