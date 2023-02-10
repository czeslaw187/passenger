import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchCredentials } from "../../lib/kitchenSlice";
import { Form, FormGroup, Input, Label, Container, Button } from "reactstrap";
import Spinner from '../../components/spinner'
function Admin() {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [input, setInput] = useState([])
    const {isLogged, logError} = useSelector(state=>state.kitchen)
    const kitchen = useSelector(state=>state.kitchen)
    useEffect(()=>{
        if (isLogged) {
            router.push('/admin/home')
        } 
    },[isLogged])
    const dispatch = useDispatch()
    console.log(kitchen, 'login')

    const handleChange =(e) => {
        const name = e.target.name
        const value = e.target.value
        setInput(values=>({...values, [name]:value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        dispatch(fetchCredentials(input))
        setLoading(true)
    }

    return (    
        <Container className="flex flex-col h-screen">
            <Container className="text-lg text-center m-auto">
            <Link href={'/'} className="font-mono no-underline text-black text-lg hover:text-xl active:text-lg">{'<< Back'}</Link>
            <Form className="m-auto w-4/12 h-[22rem] border-4 rounded-md border-slate-300 shadow-xl shadow-black flex flex-col items-center font-serif">
                <p className="m-0 text-red-500 text-lg">{kitchen.logError}</p>
                <FormGroup>
                    <Label className="my-3 text-lg" for="login">Login</Label>
                    <Input onChange={(e)=>{handleChange(e)}} 
                            className="w-9/12 h-[2rem] shadow-sm shadow-black mx-auto" 
                            type="text" 
                            id="login" 
                            name="login" 
                            placeholder="Enter your login..." 
                            value={input.login || ''}
                            required />
                </FormGroup> 
                <FormGroup>      
                <Label className="my-3 text-lg" htmlFor="password">Password</Label>
                    <Input onChange={(e)=>{handleChange(e)}} 
                            className="w-9/12 h-[2rem] shadow-sm shadow-black mx-auto" 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password..." 
                            value={input.password || ''}
                            required />
                    <Button type="submit" 
                            outline
                            submit
                            onClick={(e)=>{setInput({login:'',password:''}); handleSubmit(e)}} 
                            className="my-5 w-6/12 h-[3rem] border-2 border-slate-500 rounded-md transition duration-150 ease-in-out hover:bg-slate-500 active:bg-slate-300 hover:text-white">{loading ? <Spinner /> : 'Submit'}</Button>
                </FormGroup> 
            </Form>
            </Container>
        </Container>
     );
    
}

export default Admin;