import { GenrePageProps } from '@/types';

import PopularGameList from '@/components/PopularGameList';
import Slider from '@/components/Slider';
import TrendingGameList from '@/components/TrendingGameList';
import { getGamesByGenreId, getPopularGames } from '@/utils';

export default async function GenrePage({ params }: GenrePageProps) {
    const { id } = params;
    const gameList = await getPopularGames();
    const gamesListByGenre = await getGamesByGenreId(Number(id));

    return (
        <>
            {gameList?.length &&
                gamesListByGenre &&
                gamesListByGenre.length > 0 && (
                    <div className="md:col-span-3 col-span-4 px-3">
                        <Slider game={gamesListByGenre[0]} />
                        <TrendingGameList gameList={gameList} />
                        <PopularGameList gameList={gamesListByGenre} />
                    </div>
                )}
        </>
    );
}
