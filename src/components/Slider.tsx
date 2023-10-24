import { SliderProps } from '@/types';
import Image from 'next/image';

const Slider = ({ game }: SliderProps) => {
    return (
        <div className="relative ">
            <div className="absolute bottom-0 bg-gradient-to-t w-full pb-10 from-slate-900 to-transparent p-5 rounded-xl">
                <h2 className="text-[24px] text-white font-bold">
                    {game.name}
                </h2>
                <button className="bg-blue-700 text-white px-2 p-1">
                    Get Now
                </button>
            </div>
            <Image
                src={game.background_image}
                className="h-[170px] md:h-[320px] w-full object-cover rounded-xl"
                width={170}
                height={320}
                alt={game.slug}
            />
        </div>
    );
};

export default Slider;
