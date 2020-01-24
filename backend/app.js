const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
  'GeT, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('api/v1/posts', (req, res, next) => {
  console.log();
});


app.use('/api/v1/posts',(req, res, next) => {
  const posts = [
    {id: 'asdkfsa21',
    title: 'First server-side post',
    content: "This is coming from the server"},
    {id: 'asefar4113',
    title: 'Second server-side post',
    content: "This is coming from the server"}
  ];
  res.status(200).json( {
    message: 'Post fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
