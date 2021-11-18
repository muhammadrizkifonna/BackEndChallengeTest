const mongoose = require('mongoose')


const commentsSchema = new mongoose.Schema({

    id:{
        type: Number
    },
    commentsContent: {
        type: String
    }
});

module.exports = mongoose.model('Comments',commentsSchema)