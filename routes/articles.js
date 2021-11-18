// const { ObjectID } = require("bson")
var ObjectId = require('mongodb').ObjectId; 
const { json } = require("express")
const express = require("express")
const router = express.Router()
const Articles = require('../models/articles')
const Comments = require('../models/comments')


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
        var cmt = req.body.comments;
        var cmt_res=[]
        cmt.forEach((cm)=>{
            cmt_res.push(new Comments({
                commentsContent: cm.commentsContent,
                id: cm.id
            }));
        });
        const article = new Articles({
            author: req.body.author,
            content: req.body.content,
            comments: cmt_res
        });
    
        try{
            const saving =  await article.save();
            res.json(saving);
        }catch(err){
            res.send('Error'+err);
        }
    })

router
    .route("/:id")
    .get( async (req, res)=> {
        const articles = await Articles.findById(req.params.id);
        // console.log(articles);
        var articlesJSON = JSON.stringify(articles);
        res.send(articlesJSON);
    })
    .put( async (req, res)=> {
        try{
            var cmt = req.body.comments;
            var cmt_res=[]
            cmt.forEach((cm)=>{
                cmt_res.push(new Comments({
                    commentsContent: cm.commentsContent,
                    id: cm.id
                }));
            });
            const article = await Articles.findById(req.params.id);
            article.author = req.body.author;
            article.content = req.body.content;
            article.comments = cmt_res;
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


router
    .route("/:idArticles/comments")
    .get( async (req, res)=> {
        const articles = await Articles.findById(req.params.idArticles);
        var comments=articles.comments;
        var commentsJSON = JSON.stringify(comments);
        res.send(commentsJSON);
        
    })
    .post( async (req, res)=> {
        var commentsContent = req.body.commentsContent;
        const articles = await Articles.updateOne({"_id": ObjectId(req.params.idArticles)}, {$push: {"comments": {"id": Math.floor(Math.random() * 101), "commentsContent": commentsContent }}});
        res.status(200).send();
        
    })


router
    .route("/:idArticles/comments/:idComments")
    .get( async (req, res)=> {
        const articles = await Articles.aggregate([ 
                { "$match" : { "_id": ObjectId(req.params.idArticles) } },
                { "$unwind" : "$comments" } ,
                { "$match" : { "comments.id" : parseInt(req.params.idComments) } },
                ] );
        console.log(articles);
        
        articles.forEach(article=> {
            if (article.comments.id==req.params.idComments)
            {
                var comments = article.comments;
                var commentsJSON = JSON.stringify(comments);
                res.send(commentsJSON);
            }
        })
        
        
    })
    .put( async (req, res)=> {
        
        try{
            const article = await Articles.find({"_id": ObjectId(req.params.idArticles), "comments.id": req.params.idComments});
            console.log(article)
            articlesIndexFinal=0
            commentsIndexFinal=0
            articlesIndex=0
            article.forEach(articl=> {
                console.log("A")
                commentsIndex=0;
                articl.comments.forEach(comment=>{
                    if (comment.id==req.params.idComments)
                    {
                        console.log("Ada")
                        // comment.commentsContent = req.body.commentsContent;
                        articlesIndexFinal=articlesIndex;
                        commentsIndexFinal=commentsIndex;
                        console.log(articlesIndexFinal)
                        console.log(commentsIndexFinal)
                        
                    }
                    commentsIndex+=1;
                })
                articlesIndex+=1;
                
            })
            article[articlesIndexFinal].comments[commentsIndexFinal].commentsContent=req.body.commentsContent;
            
            const saving = await article[articlesIndexFinal].save();
            res.json(saving);  
        }catch(err){
            res.send('Error'+err)
        }
    
    
        
        
    })
    .delete(async (req, res)=> {
        try{
            const article = await Articles.find({"_id": ObjectId(req.params.idArticles), "comments.id": req.params.idComments});
            console.log(article)
            articlesIndexFinal=0
            commentsIndexFinal=0
            articlesIndex=0
            article.forEach(articl=> {
                console.log("A")
                commentsIndex=0;
                articl.comments.forEach(comment=>{
                    if (comment.id==req.params.idComments)
                    {
                        console.log("Ada")
                        // comment.commentsContent = req.body.commentsContent;
                        articlesIndexFinal=articlesIndex;
                        commentsIndexFinal=commentsIndex;
                        console.log(articlesIndexFinal)
                        console.log(commentsIndexFinal)
                        
                    }
                    commentsIndex+=1;
                })
                articlesIndex+=1;
                
            })
            article[articlesIndexFinal].comments[commentsIndexFinal].remove();
            
            const saving = await article[articlesIndexFinal].save();
            res.json(saving);  
        }catch(err){
            res.send('Error'+err)
        }
    })
    
    


module.exports = router