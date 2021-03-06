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
app.use(express.urlencoded({ extended: true }))

//sqlから全てのタグデータを取得
app.get("/api/get/all_tags", (req, res) => {
    const sqlGet = "SELECT * FROM tags"
    db.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//タグテーブルに挿入する
app.post('/api/tag/insert', (req, res) => {
    const tagName = req.body.tagName
    const sqlInsert =
        "INSERT INTO tags (Name) VALUES (?)"
    db.query(sqlInsert, [tagName], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
})

//paperデータの生成
app.post('/api/paper/insert', (req, res) => {
    const content = req.body.content
    const year = req.body.year
    const doi = req.body.doi
    const sqlInsert = "INSERT INTO papers (Content,Year,Doi) VALUES (?,?,?)"
    db.query(sqlInsert, [content, year, doi], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            console.log("success insert paper!")
        }
    })
})

//中間テーブルの生成
app.post('/api/paper_tag/insert', (req, res) => {
    const PaperId = req.body.PaperId
    const TagId = req.body.TagId
    const sqlInsert = "INSERT INTO paper_tag_table (PaperId,TagId) VALUES (?,?)"
    db.query(sqlInsert, [PaperId, TagId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            console.log("success 中間テーブル")
        }
    })
})

app.get('/api/paper_tag/get', (req, res) => {
    const sql = "SELECT TagId FROM paper_tag_table WHERE PaperId=(?) "
    console.log("req.query")
    console.log(req.query)
    const PaperId = req.query.PaperId
    db.query(sql, [PaperId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            console.log("get 中間テーブル")
        }
    })
})

//最新のpaperを取得
app.get('/api/papers/latest', (req, res) => {
    const sqlLatest = "select * from papers order by PaperId desc limit 1"
    db.query(sqlLatest, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

//paperを全て取得
app.get('/api/papers/get_all_papers', (req, res) => {
    const sqlAllPapers = "select * from papers"
    db.query(sqlAllPapers, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert =
        "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001 yeaah!")
})