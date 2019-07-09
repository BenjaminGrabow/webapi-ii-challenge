const express = require('express');
const Posts = require('./data/db');
const server = express();

server.use(express.json());

server.get('/api/posts', async (req, res) => {
  try {
    const hubs = await Posts.find(req.query);
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
    console.log(error);
    res.status(500).json({
      errorMessage: 'Error retrieving the post',
    });
  }
});

server.get('/api/posts/:id/comments', async (req, res) => {
    try {
      const { id } = req.params;
      const hub = await Posts.findById(id)
      if (hub) {
        const hubs = await Posts.findPostComments(id)
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
      const count = await Posts.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The post has been deleted' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    }
  });

  server.put('/api/posts/:id', async (req, res) => {
    try {
      const hub = await Posts.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        Errormessage: 'Error updating the post',
      });
    }
  });

  server.post('/api/posts', async (req, res) => {
    try {
    const hub = await Posts.insert(req.body);
    res.status(201).json(hub);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
});

server.post('/api/posts/:id/comments', async (req, res) => {
  const messageInfo = { ...req.body, post_id: req.params.id };
  try {
    const message = await Posts.insertComment(messageInfo);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the comment',
    });
  }
});

server.listen(3500, () => {
  console.log('Server Running on http://localhost:3500 ***\n');
});