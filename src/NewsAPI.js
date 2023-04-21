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

  function NewsAPI({ city }) {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Make api call to news api
      async function getNewsData() {
        setLoading(true);
        const resp = await axios.get(
          `https://newsapi.org/v2/everything?q=${city} Weather&apiKey=${config.NEWS_API_KEY}&pageSize=4`
        );
        setNewsData(resp.data.articles);
        setLoading(false);
      }
  
      getNewsData();
    }, [city]);
  
    return (
      <div className="App">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid container spacing={2}>
            {newsData.map((article, index) => (
              <Grid key={index} item xs={6}>
                <Card>
                  <CardActionArea href={article.url} target="_blank" rel="noopener noreferrer">
                    <CardMedia
                      component="img"
                      alt={article.title}
                      height="140"
                      image={article.urlToImage}
                      title={article.title}
                    />
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
  
  export default NewsAPI;