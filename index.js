const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const url = 'mongodb+srv://root:1234@cluster0.vn2av.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const url = 'mongodb+srv://root:1234@cluster0.vn2av.mongodb.net/blog?retryWrites=true&w=majority'
// const url = 'mongodb://localhost/blog'
const port = 4000
var cors = require('cors')

app.use(cors())
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

// con.on('open', () =>{
//     console.log("Test");
// })

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");  
})

const articlesRouter = require("./routes/articles");

app.use("/articles", articlesRouter);

  
app.listen(port, () => {
console.log(`app listening at http://localhost:${port}`)
})



