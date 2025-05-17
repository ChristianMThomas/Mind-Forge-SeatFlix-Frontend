import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Moviecard = ({ movie: { title, vote_average, poster_path, id, release_date, overview } }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) {
        console.error('Movie ID is undefined!');
        return;
      }
      navigate(`/watch/${id}`);
    
  };

  

/*   const loadMovies = async () => {
    setErrorMsg(''); */

/*     if (typeof id !== 'string') {
        console.error('Invalid ID format. ID must be a string.');
        setErrorMsg('Invalid ID format. Please check the movie ID.');
        return;
      } */
    

  
    /* try {
      const VID_SRC_BASE_URL = 'https://player.vidsrc.co/embed/movie/';
      const endpoint = `${VID_SRC_BASE_URL}${id} `;
      console.log(endpoint);
      const response = await fetch(endpoint , { mode: 'no-cors' });
      console.log(response);

      if (!response.ok) {
        throw new Error('Could not fetch Movies');
      }

      const data = await response.json(); 

      console.log('hi');
      console.log(data);

      if (data.Response === 'False') {
        setErrorMsg(data.error);
        setMovies([]);
        return;
      }

      setMovies(data.results || []); // Add fallback in case `data.results` is undefined
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMsg('Error Fetching Movies. Try again Later');
    }
  };

  useEffect(() => {
    loadMovies();
  }, [id]); 
 */
  return (
    <div className="movie-card"  onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : '/no-movie.png'
          }
          alt={title}
        />
      <div className="mt-4 text-center font-serif">
        <h3>{title}</h3>

        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="Star Icon"/>
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>

            <span>.</span>
            <p className="*year text-gray-400">
                {release_date ? release_date.split('-')[0] : 'N/A'}
            </p>
            <p className='text-amber-300 text-center '>{overview}</p>

        <div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Moviecard;