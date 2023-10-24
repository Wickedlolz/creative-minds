'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { genres } from '@/utils/genres';

const AsideNav = () => {
    const params = useParams();
    const { id } = params;
    const [activeIndex, setActiveIndex] = useState(id ? Number(id) : 0);

    return (
        <div>
            <h3 className="font-bold text-[30px] dark:text-white">Genres</h3>
            {genres.map((item, index) => (
                <Link
                    href={`/genre/${item.id}`}
                    scroll={false}
                    key={index}
                    className={`flex gap-2 items-center cursor-pointer group transition-all duration-300 rounded-lg p-3 ${
                        activeIndex == index && 'bg-slate-300 dark:bg-gray-700'
                    }`}
                    onClick={() => setActiveIndex(index)}
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
                            activeIndex == index && 'font-bold'
                        }`}
                    >
                        {item.name}
                    </h3>
                </Link>
            ))}
        </div>
    );
};

export default AsideNav;
