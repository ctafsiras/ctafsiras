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
                    Chowdhury Tafsir Ahmed Siddiki</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href='/tools'>Tools</Link></li>
                    <li><Link href='/articles'>Articles</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
