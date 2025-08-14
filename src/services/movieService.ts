import {Movie} from "../model/Movie.js";

export interface movieService {
    getMoviesRates: () => Promise<Movie[]>;
    getMoviesRus: () => Promise<Movie[]>;
    getMoviesGenres: () => Promise<Movie[]>;
    getTwoMoviesMax: () => Promise<Movie[]>;
}