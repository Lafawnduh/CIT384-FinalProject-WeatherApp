// Import necessary libraries and modules
import React, { useState, useEffect } from 'react'; // React and its hooks
import axios from 'axios'; // Axios for making HTTP requests
import config from './config'; // Config file to store API keys
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'; // Material-UI components
import '../styles/NewsArticles.css'; // CSS for this component

// Define the NewsArticles component, which accepts a prop 'city'
function NewsArticles({ city }) {
  // Declare state variables 'newsData' and 'loading' for storing fetched news data and loading state
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use the useEffect hook to fetch news data when 'city' changes
  useEffect(() => {
    // Define an async function to fetch news data from GNews API
    async function getNewsData() {
      setLoading(true); // Start loading before fetching data
      const resp = await axios.get(
        `https://gnews.io/api/v4/search?q=${city}&lang=en&country=us&max=4&apikey=${config.NEWS_ARTICLES_API_KEY}`
      );
      setNewsData(resp.data.articles); // Store fetched data in 'newsData'
      setLoading(false); // Stop loading after fetching data
    }

    getNewsData(); // Call the getNewsData function
  }, [city]); // End of useEffect hook, with 'city' as the dependency

  // Render loading state or news articles based on 'loading' state
  return (
    <div className="news-articles-card">
      {loading ? (
        <p>Loading...</p> // Render 'Loading...' if 'loading' is true
      ) : (
        <div className="grid-container">
          {/* Map over 'newsData' and render each news article */}
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

// Export the NewsArticles component so it can be used in other modules
export default NewsArticles;
