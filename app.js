const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Post = require('./models/post');

// const uri = ''
mongoose.connect(process.env.URISTRING)
    .then((result)=>{
        // listen for requests
        app.listen(3000)
    })
    .catch((err)=>{
        console.log(err)
    })



// register view engine
app.set('view engine', 'ejs')



// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



app.get('/', (req, res)=>{
    res.render('index', {title: "Homey"})
})

app.get('/add-post', (req, res)=>{
    res.render('add-post', {title: "Add Post", msg: "Add Post"})
    // const post = new Post({
    //     title: "My FOURTH post!",
    //     excerpt: "Placeholder for excerpt",
    //     body: "Testing teing one, two three................!"
    // })
    // post.save()
    // .then((result)=>{
    //      res.send(result)   
    // })
    // .catch((err)=>{
    //     console.log('Error')
    // })
})

app.post('/save-post', (req, res)=>{
    const post = new Post(req.body)
    post.save().then ((result)=>{
        res.redirect('/posts')
        // res.redirect('/posts')
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/posts', (req, res)=>{
    Post.find().sort({createdAt: -1})
    .then((result)=>{
        // res.send(result)
        res.render('posts', {title: 'Posts Page', posts: result})
    })
    .catch((err)=>{

    })
})
