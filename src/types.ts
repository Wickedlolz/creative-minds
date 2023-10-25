export type SliderProps = {
    game: Game;
};

export type TrendingGameListProps = {
    gameList: Game[];
};

export type PopularGameListProps = {
    gameList: Game[];
};

export type GenrePageProps = {
    params: { id: string };
};

type Rating = {
    id: number;
    title: string;
    count: number;
    percent: number;
};

type Requirements = {
    minimum: string;
    recommended: string;
};

type Platform = {
    platform: {
        id: number;
        name: string;
        slug: string;
        image: null;
        year_end: null;
        year_start: null;
        games_count: number;
        image_background: string;
    };
    released_at?: string | null;
    requirements_en?: null | Requirements;
    requirements_ru?: null | Requirements;
};

type ParentPlarform = {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
};

type Store = {
    id: number;
    store: {
        id: number;
        name: string;
        slug: string;
        domain: string;
        games_count: number;
        image_background: string;
    };
};

type Genre = {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
};

type Tag = {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
};

type ShortScreenshot = {
    id: number;
    image: string;
};

export type Game = {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: {
        yet: number;
        owned: number;
        beaten: number;
        toplay: number;
        dropped: number;
        playing: number;
    };
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: string;
    user_game: null | string;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: Platform[];
    parent_platforms: ParentPlarform[];
    genres: Genre[];
    stores: Store[];
    clip: null;
    tags: Tag[];
    esrb_rating: {
        id: number;
        name: string;
        slug: string;
    };
    short_screenshots: ShortScreenshot[];
};
