import React, { useState, useEffect } from 'react';

const App = () => {
  const [url, setUrl] = useState('');

   const [insights, setInsights] = useState({});

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/insight');
      const data = await response.json();
      console.log(data.url);
      setInsights(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addInsight = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setUrl('');
      setInsights([...insights, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeInsight = async (id) => {
    try {
      await fetch(`/api/insights/${id}`, {
        method: 'DELETE',
      });
      setInsights(insights.filter((insight) => insight._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const addToFavorite = async (id) => {
    try {
      const response = await fetch(`/api/insights/${id}/favorite`, {
        method: 'PUT',
      });
      const data = await response.json();
      const updatedInsights = insights.map((insight) =>
        insight._id === id ? data : insight
      );
      setInsights(updatedInsights);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Word Count App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addInsight();
        }}
      >
        <label htmlFor="urlInput">Enter URL:</label>
        <input
          type="text"
          id="urlInput"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <h2>Word Count:</h2>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Word Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight) => (
            <tr key={insight._id}>
              <td>{insight.url}</td>
              <td>{insight.wordCount}</td>
              <td>
                <button onClick={() => addToFavorite(insight._id)}>
                  Favorite
                </button>
                <button onClick={() => removeInsight(insight._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
