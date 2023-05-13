// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import '../styles/NewsArticles.css';


// NewsArticles component
function NewsArticles({ city }) {
  // State to store the fetched news data
  const [newsData, setNewsData] = useState([]);
  // State to control the loading status
  const [loading, setLoading] = useState(false);

  // useEffect hook to fetch news data when the city changes
  useEffect(() => {
    // Function to fetch news data from GNews API
    async function getNewsData() {
      setLoading(true); // Set loading state to true
      const resp = await axios.get(
        `https://gnews.io/api/v4/search?q=${city}&lang=en&country=us&max=4&apikey=${config.NEWS_ARTICLES_API_KEY}`
      );
      setNewsData(resp.data.articles); // Update newsData state with fetched data
      setLoading(false); // Set loading state to false
    }

    getNewsData(); // Call the getNewsData function
  }, [city]);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid-container">
          {newsData.map((article, index) => (
            <Card key={index} className="card">
              <CardActionArea
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-action-area"
              >
                <CardMedia
                  component="img"
                  alt={article.title}
                  height="140"
                  image={article.image}
                  title={article.title}
                  className="card-media"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" className="card-title">
                    {article.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Export the NewsArticles component
export default NewsArticles;
