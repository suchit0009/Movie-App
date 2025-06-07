import { useMovieContext } from '../context/movieContext';
import '../css/MovieCard.css';

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.Title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <button 
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="heart-icon" role="img" aria-label="favorite">
              {favorite ? '♥' : '♡'}
            </span>
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
        <div className="movie-type">
          <span className="type-badge">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;