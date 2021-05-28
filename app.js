//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash")

const homeStartingContent = "Welcome to my Webapp,My name is Aman Kose, I am a final year ECE student from IIIT Nagpur. I like to make webapp and am interested in web development. I like to play Cricket, also I like playing Chess.";
const aboutContent = "Here you can Create Blog about your daily life, It is fun to keep record, Right now I havent added any database so the progress wont be saved but I will add a database soon.";
const contactContent = "For any suggesions or improvement please mail me at: koseamanclaret@gmail.com";

const app = express();

var posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  // console.log("Hello");
  res.render("home", {homeContent: homeStartingContent, newPostUpdate: posts});

});

app.get("/about", function(req, res){
  res.render("about", {aboutPageContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contact: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.newTitle,
    content: req.body.newPost
  };
  posts.push(post);


  res.redirect("/");


});

app.post("/", function(req, res){
  res.redirect("/compose");
});


app.get("/posts/:postName", function(req, res){
  const requestedTitle =  req.params.postName;

  posts.forEach(function(post) {
    const storedTitle = post.title;

    const requestedTitleLower = lodash.lowerCase(requestedTitle);
    const storedTitleLower = lodash.lowerCase(storedTitle);

    if(storedTitleLower === requestedTitleLower){
      res.render("post", {titleName: storedTitle, postInfo: post.content});
    }
  });



});









app.listen(process.env.PORT, function() {
  console.log("Server started on port 3000");
});
