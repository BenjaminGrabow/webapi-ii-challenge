const express = require('express');
const Hubs = require('./data/db');
const server = express();

server.use(express.json());

server.get('/api/posts', async (req, res) => {
  try {
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      errorMessage: 'Error retrieving the post',
    });
  }
});

server.get('/api/posts/:id/comments', async (req, res) => {
    try {
      const { id } = req.params;
      const hub = await Hubs.findById(id)
      if (hub) {
        const hubs = await Hubs.findPostComments(id)
        res.status(200).json(hubs)
      } else {
        res.status(404).json({ message: 'Can\'t find that id!!' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({errorMessage: "Can't find the message for that user" })
    }
  });
  
  server.delete('/api/posts/:id', async (req, res) => {
    try {
      const count = await Hubs.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });



server.listen(3500, () => {
  console.log('Server Running on http://localhost:3500 ***\n');
});