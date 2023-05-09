// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

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
      {/* Display loading status */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Display the news articles in a grid
        <Grid container spacing={2}>
          {newsData.map((article, index) => (
            <Grid key={index} item xs={6}>
              <Card>
                <CardActionArea
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Display the article image */}
                  <CardMedia
                    component="img"
                    alt={article.title}
                    height="140"
                    image={article.image}
                    title={article.title}
                  />
                  {/* Display the article title */}
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {article.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

// Export the NewsArticles component
export default NewsArticles;
