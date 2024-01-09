// Require necessary modules
const express = require('express');
const redis = require('redis');

// Create an Express application
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create and connect the Redis client
const redisClient = redis.createClient();
redisClient.connect();
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Define server port
const PORT = 3000;

// Define routes
// Example: Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example: Route interacting with Redis
app.get('/data', async (req, res) => {
  try {
    const data = await redisClient.get('someKey');
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.get('/data', async (req, res, next) => {
//  try {
//    const data = await redisClient.get('someKey');
//    res.send(data);
//  } catch (error) {
//    next(error); // Passes the error to the global error handler
//  }
// }); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});