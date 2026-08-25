import { useSearchParams } from 'react-router-dom';
import type { FC } from 'react';

export const SearchBar: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.trim()) {
      // Set the parameter in URL
      setSearchParams({ q: value });
    } else {
      // Strip parameter completely from URL to avoid leftover empty params
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams);
    }
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams);
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm khóa học (ví dụ: React, Python, UI/UX...)"
          className="search-input"
        />
        {query && (
          <button 
            type="button" 
            onClick={handleClear} 
            className="clear-search-btn"
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}
      </div>
      {query && (
        <p className="search-results-hint">
          Đang hiển thị kết quả cho: <strong className="query-highlight">"{query}"</strong>
        </p>
      )}
    </div>
  );
};

export default SearchBar;
