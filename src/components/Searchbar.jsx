// Searchbar.jsx
import React, { useState } from 'react';
import './Searchbar.css';

const Searchbar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleInputChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(term);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search Movie"
        className="input"
        value={term}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} 
      />
      <button className="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Searchbar;
