import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminNav from '../../components/admin/AdminNav'
import Link from "next/link";
import { useRouter } from "next/router";
import MenuCatBtn from "../../components/admin/MenuCatBtn";
import MenuItem from "../../components/admin/MenuItem";
import MenuEditWindow from "../../components/admin/MenuEditWindow";

function menu() {
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    let theMenu = useSelector(state=>state.food.food)
    const [category, setCategory] = useState('All')
    const [edit, setEdit] = useState(false)
    console.log(theMenu, category)
    const router = useRouter()
    const categories = ['All', 'Starter', 'Main', 'Salad', 'Side']

    useEffect(()=>{
        if (!isLogged) {
            router.push('/admin')
        }
    },[])

    if (category && category != 'All') {
        theMenu = theMenu.filter(el=>{ return el.category == category}) 
    }
    
    return ( 
        <>
            <AdminNav />
            
            {edit ? <MenuEditWindow edit={edit} setEdit={setEdit} /> : null}

            <p className="hover:underline"><Link href={'/admin/home'}>{'<< Back'}</Link></p>

            <div className="max-w-full m-2 h-[3rem] border-2 border-sky-400 flex flex-row flex-wrap justify-around items-center shadow-sm shadow-black">
                {
                    categories.map((el,id)=>{
                        return <MenuCatBtn key={id} category={category} setCategory={setCategory} el={el} />
                    })
                }
            </div>
            <div className="max-w-full">
                <ul className="p-2">
                    {
                    theMenu && theMenu.map((el,id)=>{
                        return (
                            <MenuItem key={id} id={id} el={el} edit={edit} setEdit={setEdit} />
                        ) 
                    })
                    }
                </ul>
            </div>
        </>
     );
}

export default menu;
