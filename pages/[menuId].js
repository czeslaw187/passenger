import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { setOrder, resetOrder } from '../lib/newSlice'

function MenuItem() {
    const dispatch = useDispatch()
    const thePage = useSelector(state=>state.food.activePage)
    let food = useSelector(state=>state.food.food)
    let myOrder = useSelector(state=>state.food.order)
    console.log(myOrder, 'food')
    if (food && food.length > 0) {
        food = food.filter(el=>el.category == thePage)
    }
    
    return ( 
        <div className='min-w-full max-h-full pt-5'>
            <Link href={'/'}>
                <p href='#' className='ml-4'>{'<< Back'}</p>
            </Link>
            <ul>
                {
                    food && food.map((el,id)=>{
                        return(
                            <li key={id} 
                                className='w-11/12 h-[10rem] mx-auto border-2 border-slate-300 rounded-md my-2 transition-all hover:scale-105 active:scale-100'
                                onClick={()=>{dispatch(setOrder({item:el.name, category:el.category, price: el.price}))}}>
                                <h1 className='text-4xl m-2'>{el.name}</h1>
                                <h1 className='text-lg ml-2'>{el.description}</h1>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
     );
}

export default MenuItem;