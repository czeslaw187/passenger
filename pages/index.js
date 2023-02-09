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
      <ul className="min-w-full max-h-full flex flex-row flex-wrap p-5">  
      {
        foodList.map((el,id)=>{
          return (
            <li key={id} 
                className="flex flex-col justify-center m-auto text-black transition duration-300 ease-in-out hover:scale-105 active:scale-100"
                onClick={()=>{dispatch(setPage(el.category))}}>
              <Link href={'/menuId'} className="text-gray-500 no-underline">
                <div className="w-[10rem] h-[10rem]  border-2 border-slate-600 relative hover:border-4 hover:border-sky-500">
                  <Image src={el.item} fill alt="starter"/>
                </div>
                <p className="text-2xl mt-1 text-center font-serif">{el.category}</p>
              </Link>
            </li>
          )
        })
      }
    </ul>
    </>
  )
}

