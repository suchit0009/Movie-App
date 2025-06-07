const API_KEY = "59b6289a";
const BASE_URL = "https://www.omdbapi.com";

export const searchMovies = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
        const data = await response.json();
        if (data.Response === "True") {
            return {
                movies: data.Search,
                totalResults: parseInt(data.totalResults),
                currentPage: page
            };
        }
        return {
            movies: [],
            totalResults: 0,
            currentPage: page
        };
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};

export const getMovieDetails = async (imdbID) => {
    try {
        const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};