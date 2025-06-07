import MovieCard from "../components/MovieCard"
import { useState } from "react"
import "../css/Home.css"
import { searchMovies } from "../service/api"
import TrendingSection from "../components/TrendingSection";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    setCurrentPage(1);
    setHasSearched(true);
    try {
      const { movies: searchResults, totalResults: total } = await searchMovies(searchQuery, 1);
      setMovies(searchResults);
      setTotalResults(total);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    if (loading) return;
    setLoading(true);
    try {
      const { movies: searchResults } = await searchMovies(searchQuery, newPage);
      setMovies(searchResults);
      setCurrentPage(newPage);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load more movies...");
    } finally {
      setLoading(false);
    }
  };

  // Reset search and show carousels when logo is clicked
  const handleLogoClick = () => {
    setSearchQuery("");
    setMovies([]);
    setError(null);
    setLoading(false);
    setCurrentPage(1);
    setTotalResults(0);
    setHasSearched(false);
    navigate("/");
  };

  // Attach logo click handler to window for NavBar logo
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const logo = document.querySelector('.logo');
      if (logo) logo.onclick = handleLogoClick;
    }, 0);
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="home">
      {/* Search Bar at the Top */}
      <form onSubmit={handleSearch} className="search-form" style={{marginBottom: '2rem'}}>
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Show carousels only if not searching */}
      {!hasSearched && !searchQuery && (
        <>
          <TrendingSection title="Popular" searchTerm= "Harry Potter" />
          <TrendingSection title="Top Rated" searchTerm="Batman" />
        </>
      )}

      {/* Search Results */}
      {hasSearched && (
        <>
          {error && <div className="error-message">{error}</div>}
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {movies.length === 0 && !error ? (
                <div className="no-results">No movies found for your search.</div>
              ) : (
                <>
                  <div className="movies-grid">
                    {movies.map((movie) => (
                      <MovieCard movie={movie} key={movie.imdbID} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;