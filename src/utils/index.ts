const baseUrl = 'https://api.rawg.io/api';

const endpoints = {
    popularGames: `/games?key=${process.env.API_KEY}`,
    gamesListByGenreId: (genreId: number) =>
        `/games?key=${process.env.API_KEY}&genre=${genreId}`,
};

export const getPopularGames = async () => {
    try {
        const response = await fetch(`${baseUrl}${endpoints.popularGames}`);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.log(error);
    }
};

export const getGamesByGenreId = async (genreId: number) => {
    try {
        const response = await fetch(
            `${baseUrl}${endpoints.gamesListByGenreId(genreId)}`
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        return data.results;
    } catch (error) {
        console.log(error);
    }
};
