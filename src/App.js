import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";

function App() {
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    };
    setLoading(false);
  };
  const searchInputRef = useRef();

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchNews();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  const [results, setResults] = useState([]);

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12" />
      <h1 className="text-gray-900 font-thin">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          ref={searchInputRef}
          type="text"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          className="border p-1 rounded" />
        <button type="submit" className="bg-orange rounded m-1 p-1">Submit</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal text-white p-1 rounded">Clear</button>
      </form>
      {
        loading ?
          (
            <div className="font-bold text-orange-dark">
              Loading...
            </div>
          )
          :
          <ul className="list-reset leading-normal">
            {results.map((result) => {
              return (
                <li key={result.objectID}>
                  <a href={result.url} className="text-indigo-dark hover:text-indigo-darkest">{result.title}</a>
                </li>
              )
            })}
          </ul>
      }
      {error && (<div className="text-red font-bold">{error.message}</div>)}
    </div>
  );
}

export default App;
