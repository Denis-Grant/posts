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
    // res.render('index', {title: "Homey"})
    res.redirect('/posts')
})

app.get('/add-post', (req, res)=>{
    res.render('add-post', {title: "Add Post", msg: "Add Post"})
})

app.get('/posts', (req, res)=>{
    Post.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('posts', {title: 'Posts', posts: result})
    })
    .catch((err)=>{

    })
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

app.get('/posts/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then((result)=>{
        res.render('single-post', {title: 'Single Post', post: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
// app.delete('/posts/:id', (req, res)=>{
//     Post.findByIdAndDelete(req.params.id)
//     .then((result)=>{
//         res.json({redirect: '/posts'})
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// })
app.post('/delete-post/:id', (req, res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.redirect('/posts')
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.post('/update-post/:id', (req, res)=>{
        const post = new Post(req.body)
        const id = req.params.id
        console.log('UPDATING POST',id)
        Post.findByIdAndUpdate(id,    
            {title: post.title, 
            excerpt: post.excerpt,
            body: post.body})
            .then((r)=>{
                res.redirect('/posts')
            })
    .catch((err)=>{
        console.log(err)
    })
    // Post.findByIdAndDelete(req.params.id)
    // .then((result)=>{
    //     res.json({redirect: '/posts'})
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
})

app.put('/posts/:id', (req, res)=>{
    Post.findById(req.params.id)
    .then ((result)=>{
        res.render('edit-post', {title: 'Edit Post', msg: 'Editing', post: result})
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })
    // Post.findByIdAndDelete(req.params.id)
    // .then((result)=>{
    //     res.json({redirect: '/posts'})
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
})

app.get('*', (req, res)=>{
    res.redirect('/posts')
})