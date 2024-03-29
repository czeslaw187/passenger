import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { setOrder } from '../lib/newSlice'
import Navbar from '../components/Navbar'
import { Container } from 'reactstrap'

function MenuItem() {
    const dispatch = useDispatch()
    const thePage = useSelector(state=>state.food.activePage)
    let food = useSelector(state=>state.food.food.rows)
    console.log(food, 'food')
    if (food && food.length > 0) {
        food = food.filter(el=>el.category == thePage)
    }
    
    return ( 
        <>
            <Navbar />
            <Container className='h-screen mt-5 border-2 bg-gray-50 shadow-inner'>
            <div className='min-w-full max-h-full pt-5 text-black'>

                <Link href={'/'} className="no-underline hover:underline text-stone-600 hover:font-bold">
                    <p>{'<< Back'}</p>
                </Link>
                <ul>
                    {
                        food && food.map((el,id)=>{
                            return(
                                <li key={id} 
                                    className='w-11/12 h-[10rem] mx-auto rounded-md my-2 transition-all hover:scale-105 active:scale-100 shadow-lg shadow-black bg-green-50'
                                    onClick={()=>{dispatch(setOrder({id:Math.floor(Math.random() * 100000), item:el.name, category:el.category, price: el.price}))}}>
                                    <h1 className='text-4xl m-2'>{el.name}</h1>
                                    <h1 className='text-lg ml-2 font-normal'>{el.description}</h1>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            </Container>
        </>
     );
}

export default MenuItem;