import { useDispatch } from "react-redux"
import { useEffect } from "react"
import Image from "next/image"
import { fetchFullMenu } from "../lib/newSlice"
import Link from "next/link"
import { setPage } from "../lib/newSlice"
import salad from '../public/img/starter-salad.jpg'
import vegan from '../public/img/main-vegan.jpg'
import potatoe from '../public/img/starter-potatoes.jpg'
import sides from '../public/img/starter-bruschetta.jpeg'
import Spinner from "../components/spinner"
import { Card, CardTitle, CardHeader } from "reactstrap"

import Navbar from "../components/Navbar"

export default function Home() {
  const dispatch = useDispatch()  
  useEffect(()=>{
    dispatch(fetchFullMenu())
  },[dispatch])
  const foodList = [
    {item: potatoe, category: 'Starter'},
    {item: vegan, category: 'Main'},
    {item: salad, category: 'Salad'},
    {item: sides, category: 'Side'},
  ]
  return (
    <>
      <Navbar />
      <ul className="min-w-full max-h-full flex flex-row flex-wrap p-5 justify-between">  
      {
        foodList.map((el,id)=>{
          return (
            <li key={id}>
              <Link href={'/menuId'} className="text-gray-500 no-underline">
                <Card className="w-[18rem] h-[24rem] my-3 bg-gradient-to-br from-sky-50 to-blue-100 transition duration-300 hover:scale-105 active:scale-100"
                      onClick={()=>{dispatch(setPage(el.category))}}>
                  <CardHeader className="my-1">
                    <Image src={el.item} alt="starter" className="h-[20rem]" />
                  </CardHeader>
                  <CardTitle className="text-center text-2xl font-serif">
                    {el.category}
                  </CardTitle>
                </Card>
              </Link>
            </li>
          )
        })
      }
    </ul>
    </>
  )
}

