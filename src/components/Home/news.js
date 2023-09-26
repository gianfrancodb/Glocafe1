import React, { useState, useEffect } from 'react';
import './newsFeedStyles.css';

function NewsFeed() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Fetching data from the Fastify server
        const API_URL = "http://localhost:5000/news";
        fetch(API_URL)
            .then(response => {
                // Log the response status and headers
                console.log("Response Status:", response.status);
                console.log("Response Headers:", response.headers);
                return response.json();
            })
            .then(data => {
                // Log the data received
                console.log("Data received:", data);
    
                // Check if the data has an articles property (assuming the API returns data in that format)
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    console.warn("Expected data to have an 'articles' property but it doesn't. Check the API response format.");
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });
    }, []);
    

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString('en-US', { weekday: 'long' })}, ${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'long' })} ${currentDate.getFullYear()}`;

    return (
        <div className="news-container">
            <div className="head">
                <div className="headerobjectswrapper">
                    <header>Glocafe Trading</header>
                </div>
                <div className="subhead">{formattedDate} - Glocafe Trading News</div>
            </div>
            <div className="content">
                <div className="collumns">
                    {articles.map(article => (
                        <div className="collumn" key={article.url}>
                            <div className="head">
                                <span className="headline hl3">{article.title}</span>
                            </div>
                            <p>{article.description}</p>
                            <figure className="figure">
                                <img className="media" src={article.urlToImage} alt={article.title} />
                                <figcaption className="figcaption">{article.caption || "Caption for the image"}</figcaption>
                            </figure>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewsFeed;
