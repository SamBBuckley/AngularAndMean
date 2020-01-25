const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://sam:l6VkDK7YjNsxN4pm@cluster0-mgj46.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => { // Applies to all coming traffic
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GeT, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/v1/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost.id
    }); // Everything okay and rescourse added
  });
});

app.put("/api/v1/posts/:id", (req, res, next) => {
  const post = new Post ({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.param.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!" });
  });
});


app.get('/api/v1/posts',(req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json( {
      message: 'Post fetched succesfully!',
      posts: documents
    });
  });
});

app.delete("/api/v1/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
  });
  res.status(200).json( { message: "Post delete! " });
})

module.exports = app;
