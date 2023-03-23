// inorder to import express and other modules (say library in python) (also same as framework)
const express = require('express')
const fs = require('fs')


// express is a handy tool used to handle url parsing so efficiently 
/*Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build a single page, multipage, and hybrid web application. It's a layer built on the top of the Node js that helps manage servers and routes */

// My words
/* jo kam hamne if else laga laga kr url parsin kri thi vo sara kaam express kr skta hai easily routing bhot achhe se manage krta hai or free hai open source hai badiya chij hai apna kaam easy krti hai 
*/


const app = express() // The express() function is a top-level function exported by the express module.
// express function express module ke dwara export kiya hua top level function hai jo ki sab express ki capabilities hame deta hai 

//port
const port = 2500

const path = require('path')


// now in order to serve static files
// express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded()) // middleware used to get form data upto backend 
//app.use ka mtlb app me use krna usko 
// here /static is our url for folder name static
// static files are the files that is publically available over the server and anyone with the link can download that static files


// now in order to set template engine for our node backend
app.set('view engine','pug')


// now in order to set the views directory --> directory ka naam apko views hi rkhna pdega templates serve krne ke liye
app.set('views',path.join(__dirname,'views'))


// My end points

//end point for checking my pug template
app.get('/demo',(req,res)=>{
    // res.status(200).render('index',{title:"Pug template",message:"This is my message",intro:"I'm Niraj Chittodiya"})
    const params = {
        'title':"Pug template",
        'content':"This is the best content on the internet so use it wisely"
    }
    res.status(200).render('index',params)
    //now in order to use params variable in pug go into index.pug
})


//*************end point for taking form input***************
app.post('/',(req,res)=>{
    // console.log(req.body)
    let name = req.body.name
    let age = req.body.age
    let gender = req.body.gender
    let mono = req.body.mono

    let outputStr = `client name is ${name}, age is ${age}, gender is ${gender} and mobile number is ${mono} \n`
    fs.appendFileSync('output.txt',outputStr)

    const params = {'message':"Your form has been submitted successfully"}
    res.status(200).render('index',params)
})



// My custom end points 
app.get('/',(req,res)=>{
    res.send("This is my first express app")
})

app.get('/about',(req,res)=>{
    res.send("This is my about page get req")
})

app.post('/about',(req,res)=>{
    res.send("This is my about page post req")
})


app.get('/contact',(req,res)=>{
    // res.writeHead(200,{'Content-type':'text/html'})
    // res.sendFile("D:\complete web devolpment\Express\contact.html") // error hai bc dhundhunga baad me
    res.send('This is my contact page')
})

//now in order to send status code
app.get('/services',(req,res)=>{
    res.status(200).send("This is my services page")
})

app.get('/this',(req,res)=>{
    res.status(404).send("Error 404 page not found")
})

app.listen(port,()=>{
    console.log(`Your server is starting at `,`127.0.0.1:${port}`)
})