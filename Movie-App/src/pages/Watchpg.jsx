import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Watchpg = () => {
  const { id } = useParams(); // Extract the movie ID from the URL
  const embedUrl = `https://player.vidsrc.co/embed/movie/${id}`;
  const [loading, setLoading] = useState(true);

  if (!id) {
    return <p className="text-red-500 text-center mt-10">Invalid Movie ID. Please try again.</p>;
  }

  return (
    <div className="text-white text-center mt-24">
      <p className="text-yellow-400 m-5 text-3xl">Movie not loading?</p>
      <p className="text-yellow-400 m-5 text-3xl">Disable Ad-Blocker & try again!</p>
      {loading && <p className="text-center text-lg">Loading movie...</p>}
      <main className="w-3/4 text-center m-auto">
        <iframe
          src={embedUrl}
          title="Movie Player"
          width="100%"
          height="550px"
          allowFullScreen
          aria-label="Video player for the selected movie"
          onLoad={() => setLoading(false)}
        ></iframe>
        
        <p className="text-yellow-400 m-15 text-3xl">If you have any problems please contact us with the information below </p>
      </main>
    </div>
  );
};

export default Watchpg;