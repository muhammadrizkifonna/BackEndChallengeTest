const { json } = require("express")
const express = require("express")
const router = express.Router()
const Articles = require('../models/articles')


router
    .route("/")
    .get(async (req, res) => {
        sort = req.query.sort;
        filter = req.query.filter;
        if (sort=="asc")
        {
            const articles = await Articles.aggregate(
                [
                    { $sort : { content : 1 }}
                ]
            )
            console.log(articles);
            var articlesJSON = JSON.stringify(articles);
            res.send(articlesJSON);
        }
        else if (sort=="dsc")
        {
            const articles = await Articles.aggregate(
                [
                  { $sort : { content : -1 } }
                ]
            )
            console.log(articles);
            var articlesJSON = JSON.stringify(articles);
            res.send(articlesJSON);
        }
        else
        {
            const articles = await Articles.find()
            console.log(articles);
            var articlesJSON = JSON.stringify(articles);
            res.send(articlesJSON);
        }
            
    })
    .post(async (req, res) => {
        const article = new Articles({
            author: req.body.author,
            content: req.body.content,
            comments: req.body.comments
        });
    
        try{
            const saving =  await article.save();
            res.json(saving);
        }catch(err){
            res.send('Error');
        }
    })
    .put(async (req, res) => {
        
        
    })
    .delete((req, res) => {
    
    })

router
    .route("/:id")
    .put( async (req, res)=> {
        try{
            const article = await Articles.findById(req.params.id);
            article.author = req.body.author;
            article.content = req.body.content;
            article.comments = req.body.comments;
            const saving = await article.save();
            res.json(saving);  
        }catch(err){
            res.send('Error')
        }
    })
    .delete(async (req, res)=> {
        try{
            const article = await Articles.findById(req.params.id).deleteMany().exec();
            res.status(200).send();  
        }catch(err){
            res.send('Error')
        }
    })


module.exports = router