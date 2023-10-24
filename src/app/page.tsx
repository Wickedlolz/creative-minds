import { getGamesByGenreId, getPopularGames } from '@/utils';

import PopularGameList from '@/components/PopularGameList';
import SideNav from '@/components/SideNav';
import Slider from '@/components/Slider';
import TrendingGameList from '@/components/TrendingGameList';

export default async function Home() {
    const gameList = await getPopularGames();
    const gamesListByGenre = await getGamesByGenreId(0);

    return (
        <section className="grid grid-cols-4 p-8">
            <div className="hidden md:flex">
                <SideNav
                // selectedGenreId={(genreId) => getGameList(genreId)}
                />
            </div>
            {gameList?.length && gamesListByGenre?.length > 0 && (
                <div className="md:col-span-3 col-span-4 px-3">
                    <Slider game={gamesListByGenre[0]} />
                    <TrendingGameList gameList={gameList} />
                    <PopularGameList gameList={gamesListByGenre} />
                </div>
            )}
        </section>
    );
}
