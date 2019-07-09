const express = require('express');

const postsRoutes = require('./data/posts-routes');

const server = express();

server.use(express.json());

server.use(postsRoutes);

server.listen(3500, () => {
  console.log('Server Running on http://localhost:3500 ***\n');
});