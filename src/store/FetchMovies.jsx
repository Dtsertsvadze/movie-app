const API_KEY = "66a0f1d292a5298e7bd8bed7abb97bbc";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (path) => {
  const API_URL = BASE_URL + path + "&api_key=" + API_KEY;

  try {
    const result = await fetch(API_URL);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const searchEngine = async (keyWord) => {
  const API_URL = BASE_URL + keyWord + "&api_key=" + API_KEY;

  try {
    const result = await fetch(API_URL);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
