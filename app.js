const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const e = require("express");

const homeStartingContent = "This is Full-Stack Basic Blog website created by Me intregrated with MongoDB";
const aboutContent = "Created By Pranav Mahajan, Second year Information Science Engineering Student at R.V College Of Engineering"
const contactContent = "Bengaluru,Karnataka,India";

const app = express();

mongoose.connect("mongodb+srv://admin-pranav:######@cluster0.1r9qq.mongodb.net/blogDB", {useNewUrlParser:true,useUnifiedTopology:true});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public",express.static(__dirname+"/public"));

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});

const Posts = mongoose.model("Posts", postSchema);
const posts=[];

app.get("/", (req,res)=>{
  Posts.find({}, (err,userPosts)=>{
    if(err){
      console.log(err);
    }else{
      res.render("home", {hsc:homeStartingContent, data: userPosts});
    }
  })
   
})

app.get("/about", (req,res)=>{
  res.render("about",{ac:aboutContent} );
})

app.get("/contact", (req,res)=>{
  res.render("contact",{cc:contactContent});
})

app.get("/compose", (req,res)=>{
  res.render("compose");
})

app.post("/compose", (req,res)=>{
  const postItem = new Posts({
    title: req.body.postTitle,
    content: req.body.postBody
  })
  postItem.save((err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("saved to database");
    }
  });
  res.redirect("/");
})

app.get("/posts/:postId", (req,res)=>{
  const postId = req.params.postId;
  Posts.findOne({_id:postId}, (err,foundpost)=>{
    if(err){
      console.log(err);
    }else{
      res.render("post", {heading:foundpost.title, body: foundpost.content})
    }
  })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=>{
  console.log("Server started at port 3000");
});