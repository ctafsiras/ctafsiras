import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Chowdhury Tafsir Ahmed Siddiki</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Tools</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
        </div>
            );
}

export default Navbar;
