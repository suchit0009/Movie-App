import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import '../css/TrendingSection.css';
import { searchMovies } from '../service/api';

const TrendingSection = ({ title, searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    searchMovies(searchTerm, 1)
      .then(({ movies }) => {
        if (isMounted) setMovies(movies || []);
      })
      .catch(() => {
        if (isMounted) setError('Failed to load movies.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [searchTerm]);

  return (
    <section className="trending-section">
      <h2 className="trending-title">{title}</h2>
      {loading ? (
        <div className="trending-loading">Loading...</div>
      ) : error ? (
        <div className="trending-error">{error}</div>
      ) : (
        <div className="trending-carousel">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingSection; 