'use client';

import { useState } from 'react';
import Image from 'next/image';
import { genres } from '@/utils/genres';
import { SideNavProps } from '@/types';

const SideNav = ({ selectedGenreId }: SideNavProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const selectGenre = (index: number, itemId: number) => {
        setActiveIndex(index);

        if (selectedGenreId) {
            selectedGenreId(itemId);
        }
    };

    return (
        <div>
            <h3 className="font-bold text-[30px] dark:text-white">Genres</h3>
            {genres.map((item, index) => (
                <div
                    key={index}
                    className={`flex gap-2 items-center cursor-pointer group transition-all duration-300 rounded-lg p-3 ${
                        activeIndex == index && 'bg-slate-300 dark:bg-gray-700'
                    }`}
                    onClick={() => selectGenre(index, item.id)}
                >
                    <Image
                        src={item.image_background}
                        width={40}
                        height={40}
                        className={`w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-110 transition-all duration-300 ${
                            activeIndex == index ? 'scale-110' : null
                        } `}
                        alt={item.slug}
                    />
                    <h3
                        className={`text-[18px] group-hover:font-bold dark:text-white transition-all duration-300 ${
                            activeIndex == index ? 'font-bold' : null
                        }`}
                    >
                        {item.name}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default SideNav;
