const mongoose = require('mongoose')
const Comments = require('../models/comments').schema


const articlesSchema = new mongoose.Schema({

    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    ,
    comments: [Comments]
}, { collection: 'articles' });

module.exports = mongoose.model('Articles',articlesSchema, 'articles')