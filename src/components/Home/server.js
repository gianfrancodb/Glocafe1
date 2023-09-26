const fastify = require('fastify')({ logger: true });
const axios = require('axios');
const cors = require('@fastify/cors'); // Updated CORS import

// Enable CORS
fastify.register(cors, {
    origin: true, // Reflect the request origin
    credentials: true, // Allow cookies
  });
  


const API_KEY = 'aa66f5edf4774bb5bbeb2d07900c9b16'; // Your News API key

fastify.get('/news', async (request, reply) => {
    const currentDate = new Date();
    const end = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const start = new Date(currentDate);
    start.setDate(currentDate.getDate() - 30); // 30 days in the past
    const begin = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;

    const query = `...`; // Your query string
    const API_URL = `https://newsapi.org/v2/everything?q=${query}&from=${begin}&to=${end}&sortBy=relevancy&apiKey=${API_KEY}&pageSize=10&language=en`;

    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Failed to fetch news' });
    }
});

const start = async () => {
    try {
        await fastify.listen({ port: 5000 }); // Updated listen method
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
