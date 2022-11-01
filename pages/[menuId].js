import {useRouter} from 'next/router'

function MenuItem() {
    const router = useRouter()
    const menuId = router.query.id
    console.log(router)
    return ( 
        <div className='min-w-full max-h-full'>
            <h1>{menuId}</h1>
        </div>
     );
}

export default MenuItem;