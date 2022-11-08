import Link from "next/link";
function admin() {
    return ( 
        <>
            <p className="hover:underline"><Link href={'/'}>{'<< Back'}</Link></p>
            <div>admin</div>
        </>
     );
}

export default admin;