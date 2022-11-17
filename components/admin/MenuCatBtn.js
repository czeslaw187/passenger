function MenuCatBtn({el, category, setCategory}) {
    return ( 
        <button id={el} 
                onClick={(e)=>{setCategory(e.target.id)}}
                className={category == el ? "w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out bg-sky-500 shadow-sm shadow-black" : 
                "w-[8rem] h-[2rem] m-1 border-2 border-sky-500 transition duration-150 ease-in-out hover:bg-sky-500 active:bg-sky-300 shadow-sm shadow-black"}>
            {el}
        </button>
     );
}

export default MenuCatBtn;