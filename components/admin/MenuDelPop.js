function MenuDeletePopup({delPop, setDelPop}) {
    return ( 
        <div className={delPop ? "animate-show bg-black opacity-30 absolute w-full min-h-screen flex" : "hidden"}>
            <div className="relative m-auto w-[15rem] h-[8rem] bg-amber-100 border-2 rounded-md text-center flex flex-col justify-center">
                <p className="mx-auto text-lg opacity-100">Are you sure ?</p>
                <div className="space-x-4">
                    <button className="hover:underline" onClick={()=>{}}>Yes</button>
                    <button className="hover:underline" onClick={()=>{setDelPop(!delPop)}}>No</button>
                </div>
            </div>
        </div>
     );
}

export default MenuDeletePopup;