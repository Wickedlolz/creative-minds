'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
    HiMoon,
    HiOutlineBars3CenterLeft,
    HiOutlineMagnifyingGlass,
    HiOutlineXMark,
    HiSun,
} from 'react-icons/hi2';
import AsideNav from './AsideNav';

const Header = () => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>('light');

    return (
        <header className="flex items-center p-3">
            <Image
                src="/logo.png"
                width={60}
                height={60}
                className="hidden md:block"
                alt="Site Logo"
            />
            <div className="md:hidden">
                {!toggle ? (
                    <HiOutlineBars3CenterLeft
                        onClick={() => setToggle(!toggle)}
                        className="dark:text-white text-[25px] cursor-pointer"
                    />
                ) : (
                    <HiOutlineXMark
                        onClick={() => setToggle(!toggle)}
                        className="dark:text-white text-[25px] cursor-pointer"
                    />
                )}
                {toggle && (
                    <div className="absolute left-0 z-10 bg-white mt-3 dark:bg-[#121212]">
                        <AsideNav />
                    </div>
                )}
            </div>
            <div className="flex bg-slate-200 mx-5 w-full p-2 rounded-full items-center px-2">
                <HiOutlineMagnifyingGlass />
                <input
                    type="text"
                    placeholder="Search Games"
                    className="bg-transparent w-full outline-none pl-2 items-center rounded-full"
                />
            </div>
            <div>
                {theme == 'dark' ? (
                    <HiSun
                        className="text-[35px] cursor-pointer bg-gray-200 text-black p-1 rounded-full"
                        onClick={() => setTheme('light')}
                    />
                ) : (
                    <HiMoon
                        className="text-[35px] cursor-pointer bg-gray-200 text-black p-1 rounded-full"
                        onClick={() => setTheme('dark')}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
