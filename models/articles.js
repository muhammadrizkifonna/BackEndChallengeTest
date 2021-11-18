const mongoose = require('mongoose')


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
    comments: {
        type: Array,
        required: false
    }
}, { collection: 'articles' });

module.exports = mongoose.model('Articles',articlesSchema, 'articles')