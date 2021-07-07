const express = require("express")
const bodyParser = require('body-parser') // body-parser
const cors = require("cors");
const app = express()
const mysql = require("mysql")


// app.use(cors());
// app.use(express.json());

//pedroさんの動画はこっち
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: 'password',
    database: 'CRUDDataBase'
})

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: 'password',
//     database: 'CRUDDataBase',
// })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/api/get",(req, res) => {
    const sqlGet = "SELECT * FROM movie_reviews"
    db.query(sqlGet,(err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
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

// app.get("/api/insert", (req, res) => {
//     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('avatar','awrsome');"
//     db.query(sqlInsert, (err, result) => {
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     })
// }) 

app.listen(3001, () => {
    console.log("running on port 3001 yeaah!")
})

// CREATE TABLE CRUDDataBase.movie_reviews(
//     id INT NOT NULL AUTO_INCREMENT,
//     movieName VARCHAR(200) NOT NULL,
//     movieReview Text(500) NOT NULL,
//     PRIMARY KEY (id));
