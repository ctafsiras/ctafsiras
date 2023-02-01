import React, { useState, useEffect } from 'react';

const LoveQuotesGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuotes()
      .then(quote => setQuote(quote))
      .catch(error => setError(error.message));
  }, []);

  const handleClick = () => {
    fetchQuotes()
      .then(quote => setQuote(quote))
      .catch(error => setError(error.message));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quote);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Love Quotes Generator</h1>
      {error && <p className="text-red-500">{error}</p>}
      {quote !== null && (
        <div className="bg-white p-10 shadow-lg rounded-lg">
          <p className="text-xl mb-5">{quote}</p>
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mr-5" onClick={handleCopy}>Copy</button>
          <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" onClick={handleClick}>Generate Another Quote</button>
        </div>
      )}
    </div>
  );
};

const fetchQuotes = async () => {
  const response = await fetch('https://api.quotable.io/random');
  if (!response.ok) {
    throw new Error("Could not fetch quotes");
  }
  const data = await response.json();
  return data.content;
};

export default LoveQuotesGenerator;
