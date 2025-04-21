import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";

const VID_MOVIES_API_BASE_URL_ = "https://player.vidsrc.co/embed/movie/";
const VID_TV_API_BASE_URL_ = "https://player.vidsrc.co/embed/tv/";
const VID_API_KEY = null;
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

  const fetchMedia = async () => {
    setIsLoading("True");
    setErrorMsg("");

    try {
      const TMDB_endpoint = `${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const TMDB_response = await fetch(TMDB_endpoint, API_OPTIONS);

      if (!TMDB_response.ok) {
        throw new Error("Failed to fetch TMDB DATA");
      }

      const TMDB_data = await TMDB_response.json();
      console.log(TMDB_data);

      if (TMDB_data.Response == "False") {
        setErrorMsg(TMDB_data.Error || "Failed to fetch data");
        setMovieList([]);
        return;
      }

      setMovieList(TMDB_data.results);
    } catch (error) {
      console.error(`Error fetching TMDB MOVIE DATA ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <main>
      <div className="wrapper">
        <header>
          <Search />
        </header>

        <section className="all-movies">
          <h2>Xplore Today's Trending Titles</h2>

          {isLoading ? (
           <Spinner />
          ) : errorMsg ? (
            <p className="text-red-400">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={"movieId"} className="text-white">
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Searchpg;
