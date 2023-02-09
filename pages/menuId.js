import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { setOrder } from '../lib/newSlice'
import Navbar from '../components/Navbar'
import { Container, Card, CardBody, CardTitle, CardText } from 'reactstrap'

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
                                <li id={id} 
                                    className="transition duration-300 ease-in-out hover:scale-105 active:-100"
                                    onClick={()=>{dispatch(setOrder({id:Math.floor(Math.random() * 100000), item:el.name, category:el.category, price: el.price}))}}>
                                    <Card className='w-11/12 h-[10rem] mx-auto font-serif my-3 bg-gradient-to-b from-green-50 to-blue-50'>
                                        <CardBody>
                                            <CardTitle className='text-4xl text-center'>
                                                {el.name}
                                            </CardTitle>
                                            <CardText className='text-justify mt-2'>
                                                {el.description}
                                            </CardText>
                                        </CardBody>
                                    </Card>
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