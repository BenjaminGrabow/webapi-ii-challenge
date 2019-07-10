const express = require('express');
const Posts = require('./db');
const route = express.Router();

route.get('/api/posts', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

route.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Hubs.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
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

route.get('/api/posts/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id)
    if (post) {
      const hubs = await Posts.findPostComments(id)
      res.status(200).json(hubs)
    } else {
      res.status(404).json({ message: 'Can\'t find that id!!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: "Can't find the message for that user" })
  }
});

route.delete('/api/posts/:id', async (req, res) => {
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

route.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json(post);
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

route.post('/api/posts', async (req, res) => {
  if (req.body.title[0] === undefined && req.body.content[0] === undefined) {
    res.status(400).json({ message: "Please provide title and contents for the post." })
  } else {
    try {
      const posts = await Posts.insert(req.body);
      res.status(201).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    }
  }
});

route.post('/api/posts/:id/comments', async (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  if (commentInfo.text[0] === undefined) {
    res.status(400).json({ message: "Please provide text for the comment." })
  } else {
    try {
      const message = await Posts.insertComment(commentInfo);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({
        message: 'Error adding the comment',
      });
    }
  }
});

module.exports = route;