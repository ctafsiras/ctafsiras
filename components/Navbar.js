import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href='/.' className="btn btn-ghost normal-case text-xl avatar">
                    <div className="w-10 rounded-full mr-2">
                        <Image width={1} height={1} alt='Chowdhury Tafsir Ahmed Siddiki' src="/favicon.ico" />
                    </div>
                    <span className='text-sm sm:text-xl'>Chowdhury Tafsir Ahmed Siddiki</span>
                    </Link>
            </div>
            <div className="hidden sm:block flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href='/tools'>Tools</Link></li>
                    <li><Link href='/articles'>Articles</Link></li>
                </ul>
            </div>


            <div className="dropdown dropdown-end sm:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href='/tools'>Tools</Link></li>
                    <li><Link href='/articles'>Articles</Link></li>
                </ul>
            </div>




        </div>




    );
}

export default Navbar;
