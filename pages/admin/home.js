import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AdminNav from "../../components/admin/AdminNav";
import { useEffect } from "react";
import { List, ListInlineItem, Card, CardBody, CardTitle, Container } from "reactstrap";

function AdminHome() {
    const pages = [
                    {page:'Orders', url:'/admin/order'}, 
                    {page:'Archive', url:'/admin/archive'},
                    {page:'Menu', url:'/admin/menu'},
                    {page:'Change Password', url:'/admin/pwd'}
                  ]
    const isLogged = useSelector(state=>state.kitchen.isLogged)
    const router = useRouter()
    useEffect(()=>{
        if (!isLogged) {router.push('/admin')}
    },[isLogged])

    return ( 
        <div>
            <AdminNav />
            <Container className="text-center flex flex-row flex-wrap justify-center md:justify-between">
                {
                    pages.map((page,id)=>{
                        return (
                            <Card key={id} className="w-[10rem] h-[10rem] m-4 font-serif transition duration-300 ease-in-out hover:scale-105 active:scale-100 hover:border-2 hover:border-black shadow-md shadow-black bg-gradient-to-br from-sky-50 to-orange-50"
                                  onClick={()=>{router.push(page.url)}}>
                                <CardBody className="flex h-full m-auto">
                                    <CardTitle className="text-2xl text-center m-auto">
                                        {page.page}
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        )
                    })
                }
            </Container>
        </div>
     );
}

export default AdminHome;