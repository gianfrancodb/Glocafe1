const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001;
const API_KEY = 'aa66f5edf4774bb5bbeb2d07900c9b16'; // Replace with your News API key

app.use(express.json());

app.get('/api/news', async (req, res) => {
    try {
        // You can customize the API query here
        const currentDate = new Date();
        const end = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const start = new Date(currentDate);
        start.setDate(currentDate.getDate() - 30); // 30 days in the past
        const begin = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;

        const query = `(%22coffee%20industry%22%20OR%20%22coffee%20market%22%20OR%20%22coffee%20trade%22%20OR%20%22coffee%20production%22%20OR%20%22coffee%20economics%22%20OR%20%22specialty%20coffee%20business%22%20OR%20%22coffee%20farmers%22%20OR%20%22coffee%20supply%20chain%22%20OR%20%22coffee%20prices%22%20OR%20%22coffee%20demand%22)%20AND%20(%22arabica%22%20OR%20%22robusta%22)`;
        const API_URL = `https://newsapi.org/v2/everything?q=${query}&from=${begin}&to=${end}&sortBy=relevancy&apiKey=${API_KEY}&pageSize=10&language=en`;

        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status === 'ok' && data.articles) {
            res.json(data.articles);
        } else {
            throw new Error('Failed to fetch news data');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
