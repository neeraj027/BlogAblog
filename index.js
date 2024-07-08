import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    password:"27022002N.k",
    database:"blog",
    port:5432
})

const data = async () =>{
    blogs = await db.query("SELECT * FROM blogs_table")
    wholeBlog=blogs.rows;
}

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})

app.get("/addPost",(req,res)=>{
    res.render("addPost.ejs")
})

db.connect();

app.post("/blogs",async (req,res)=>{
    const Btitle = req.body["addPost-title"];
    const Bauthor = req.body["addPost-author"]
    const Bcontent = req.body["addPost-content"]
    db.query("INSERT INTO blogs_table(blog_title,blog_author,blog_content) VALUES($1,$2,$3)",
    [Btitle,Bauthor,Bcontent])
    res.redirect("/blogs")
})


let blogs 
let wholeBlog = []

app.get("/blogs",async(req,res)=>{
    await data()
    res.render("blogs.ejs",{wholeBlog:wholeBlog})
})  

app.listen(port,(req,res)=>{
    console.log(`Listening to port ${port}`)
})
