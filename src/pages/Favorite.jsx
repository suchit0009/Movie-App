import "../css/Favorite.css";
import "../css/Home.css";
import { useMovieContext } from "../context/movieContext";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      </div>
    );
  }

  return <div className="favorites-empty">
    <h1>No favorite yet</h1>
    <p>Add your favorite here</p>
    </div>
}
export default Favorite;