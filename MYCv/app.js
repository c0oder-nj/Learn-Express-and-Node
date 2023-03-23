const express = require('express')
const { dirname } = require('path')
const path = require('path')
const app = express()
const port = 8080
const database = require('./database')

console.log(dirname)
console.log(__dirname)

app.use('/static',express.static('static')) // now the static folder will publically available for style.css and index.js

// app.use(express.static('templates'))// inorder to set templates folder as default folder for templates

// app.use(express.static(path.join(__dirname+'/templates')))


app.get('/',(req,res)=>{
    // res.status(200)
    res.status(200).sendFile('index.html',{root:__dirname+'/templates'})
})

app.get('/intro',(req,res)=>{
    res.status(200).sendFile('intro.html',{root:__dirname+'/templates'})
})

app.get('/services',(req,res)=>{
    res.status(200).sendFile('services.html',{root:__dirname+'/templates'})
})

app.get('/blog',(req,res)=>{
    res.status(200).sendFile('blog.html',{root:__dirname+'/templates'})
})

app.get('/contact',(req,res)=>{
    res.status(200).sendFile('contact.html',{root:__dirname+'/templates'})
})

// in-order to get user data in the database
app.use(express.urlencoded())// jab bhi aap req.body se kuchh lena chahate for e.g. req.body.name or age etc so you need to set urlencoded use in express app
app.post('/',(req,res)=>{
    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phone
    let msg = req.body.msg

    let sql_query = `INSERT INTO user_data (Name, Email, Phone, message) VALUES (?,?,?,?);`
    database.query(sql_query,[name,email,phone,msg],(err,data)=>{
        if(err){
            throw err;
        }
        else{
            console.log(`Your record is inserted in database`)
            res.status(200).redirect('/')
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})