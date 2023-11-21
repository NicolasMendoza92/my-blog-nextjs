import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import UserInfo from './UserInfo';

export default function Navbar() {

    const [showNav, setShowNav] = useState(false);

    const inactiveLink = 'flex justify-center gap-1 p-1 text-white';
    const activeLink = 'flex justify-center gap-1 p-1 text-blue-300 rounded';

    // way to create router in nextjs 
    const router = useRouter();
    const { pathname } = router;

    const collapseData = (e) => {
        e.preventDefault(e);
        setShowNav(prev => !prev);
    }

    return (
        <>
            <div className="bg-blue-600 p-4">
                {/* en pantallas grandes se esconde */}
                <div className='flex justify-between items-center gap-2 md:hidden'>
                    <button onClick={collapseData}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <Link href={"/"}>
                        <img className='h-10' src='https://res.cloudinary.com/dbv6dgwez/image/upload/v1669645478/CV/skills_dn2luc.png'></img>
                    </Link>
                </div>
                {/* en pantallas grandes aparece*/}
                <div className='flex justify-between items-center gap-2 p-1 max-md:hidden'>
                    <Link href={"/"} >
                        <img className='h-10' src='https://res.cloudinary.com/dbv6dgwez/image/upload/v1669645478/CV/skills_dn2luc.png'></img>
                    </Link>
                    <Link href={"/profilePage"} className={pathname.includes('/profilePage') ? activeLink : inactiveLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                </div>
            </div>
            {showNav === true ? (
                <div className='flex flex-col w-full bg-blue-600 top-0 fixed items-center p-1 md:hidden md:w-auto transition-all z-10 '>
                    <div>
                        <button onClick={collapseData}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <Link href={"/profilePage"} className={pathname.includes('/profilePage') ? activeLink : inactiveLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            ) : null}
        </>

    )
}
