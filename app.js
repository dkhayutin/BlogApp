var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 8080;


app = express()

mongoose.connect('mongodb://localhost/restful_blog_app');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));

//mongoose/model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

//Restful Routes

app.get('/', function(req, res) {
  res.redirect('/blogs')
})

app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if(err){
      console.log('Error')
    } else {
      res.render('index', {blogs: blogs});

    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
