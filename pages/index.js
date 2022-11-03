import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import Image from "next/image"
import { fetchFullMenu } from "../lib/newSlice"
import Link from "next/link"
import { setPage } from "../lib/newSlice"

import salad from '../public/img/starter-salad.jpg'
import vegan from '../public/img/main-vegan.jpg'
import potatoe from '../public/img/starter-potatoes.jpg'
import sides from '../public/img/starter-bruschetta.jpeg'

export default function Home() {
  const dispatch = useDispatch()
  const allFood = useSelector(state=>state.food)

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
    <ul className="min-w-full max-h-full flex flex-row flex-wrap p-5">
      {
        foodList.map((el,id)=>{
          return (
            <li key={id} 
                className="flex flex-col justify-center transition-all hover:scale-110 hover:z-10 active:scale-100 m-auto"
                onClick={()=>{dispatch(setPage(el.category))}}>
              <Link href={`/${el.category}`}>
                <div className="w-[20rem] h-[20rem]  border-2 border-slate-600 relative">
                  <Image src={el.item} fill alt="starter" />
                </div>
                <p className="text-2xl mt-1 text-center">{el.category}</p>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

