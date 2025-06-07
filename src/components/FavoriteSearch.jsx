import { useState } from 'react';
import '../css/FavoriteSearch.css';

const FavoriteSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className="favorite-search" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search in favorites..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default FavoriteSearch; 