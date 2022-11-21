function MenuEditWindow({setEdit, edit}) {
    return ( 
        <div className="absolute w-full min-h-screen flex">
            <div className="relative bg-amber-100 w-6/12 h-[40rem] opacity-90 rounded-md border-2 m-auto border-black animate-show flex flex-col">
                <button className="px-3 text-right text-xl font-bold active:opacity-75"
                        onClick={()=>{setEdit(!edit)}}>
                            x
                </button>
            </div>
        </div>
     );
}

export default MenuEditWindow;