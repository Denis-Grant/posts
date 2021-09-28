const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postschema)

module.exports = Post