import { Modal, ModalBody, Button, ModalHeader } from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

function ClearOrders({setYesNo, clearOrders, yesNo}) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const toggle =()=> {
        setIsOpen(!isOpen)
    }
    return ( 
        <>
        <Button className="w-full h-[4rem] m-1 shadow-sm shadow-black"
                onClick={toggle}
                color="warning">
            Clear Orders
        </Button>
        <Modal isOpen={isOpen} 
               toggle={toggle}>
            <ModalHeader className="text-2xl text-center mx-auto">
                Are you sure you want to delete all records ?
            </ModalHeader>
            <ModalBody className="flex flex-row justify-around h-[20rem] bg-gradient-to-tr from-amber-50 to-orange-50 shadow-black shadow-md">
                <Button className="w-[10rem] h-[5rem] my-auto shadow-xl shadow-black" onClick={()=>{dispatch(clearOrders()); setYesNo(!yesNo)}}>Yes</Button>
                <Button className="w-[10rem] h-[5rem] my-auto shadow-xl shadow-black" onClick={toggle}>No</Button>
            </ModalBody>
        </Modal>
        </>
     );
}

export default ClearOrders;