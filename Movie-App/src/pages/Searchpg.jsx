import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import Moviecard from "../components/Moviecard";
import { getTrendingMovies, updateSearchCount } from "../appwrite";


const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

const Searchpg = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 750, [searchTerm]);

  const fetchMedia = async ( query= '') => {
    setIsLoading("True");
    setErrorMsg("");

    try {
      const TMDB_endpoint = query 
      ?`${TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const TMDB_response = await fetch(TMDB_endpoint, API_OPTIONS);

      if (!TMDB_response.ok) {
        throw new Error("Failed to fetch TMDB DATA");
      }

      const TMDB_data = await TMDB_response.json();
      

      if (TMDB_data.Response == "False") {
        setErrorMsg(TMDB_data.Error || "Failed to fetch data");
        setMovieList([]);
        return;
      }

      setMovieList(TMDB_data.results);
      if(query && TMDB_data.results.length > 0){
        await updateSearchCount(query, TMDB_data.results[0]);
      }

    } catch (error) {
      console.error(`Error fetching TMDB MOVIE DATA ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMedia = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      
    } catch (error) {
      console.error(`error fetching trending movies ${error}`);
    }
    
  }

  useEffect(() =>{
    loadTrendingMedia();
  }, [movieList]);

  useEffect(() => {
    fetchMedia(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <main>
      <div className="wrapper">
        <header>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
             ))}
            </ul>

          </section>
        )}

        <section className="all-movies">
          <h2 className=" text-4xl text-center m-5">Explore today's hottest titles</h2>

          {isLoading ? (
           <Spinner />
          ) : errorMsg ? (
            <p className="text-red-400">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <Moviecard key={movie.id} movie ={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Searchpg;
