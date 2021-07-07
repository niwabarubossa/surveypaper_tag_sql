const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: 'password',
    database: 'survey_paper'
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//sqlから全てのタグデータを取得
app.get("/api/get/all_tags",(req, res) => {
    const sqlGet = "SELECT * FROM tags"
    db.query(sqlGet,(err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/api/tag/insert', (req,res) => {
    const tagName = req.body.tagName    
    const sqlInsert = 
        "INSERT INTO tags (Name) VALUES (?)"
    db.query(sqlInsert,[tagName],(err , result)=>{
        if (err){
            console.log(err)
        }
        console.log(result)
    })
})

app.post('/api/insert', (req,res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview    
    const sqlInsert = 
        "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    db.query(sqlInsert,[movieName, movieReview],(err , result)=>{
        if (err){
            console.log(err)
        }
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001 yeaah!")
})