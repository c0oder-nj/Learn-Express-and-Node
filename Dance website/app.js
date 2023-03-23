const express = require("express");
const path = require("path");
const database = require('./database.js')
const app = express();
const port = 800;


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact',(req,res)=>{
    res.render('contact.pug');
})

app.listen(port,()=>{
    console.log(`Server is successfully started at port ${port}`)
})

//in order to get form data into our mysql database:-
app.post('/',(req,res,next)=>{
    let name = req.body.name;
    let age = req.body.age;
    let mono = req.body.mono;
    let email = req.body.email;
    let query = req.body.query;

    // let sql_query = `insert into 'dancewebsite'.'contact' ("name", "age", "mono", "email", "query") values (${name},${age},${mono},${email},${query});`
    let sql_query = `INSERT INTO contact (name, age, mono, email, query) VALUES (?,?,?,?,?);`
    database.query(sql_query,[name,age,mono,email,query],(err,data)=>{
        if(err){
            throw err;
        }
        else{
            console.log(`Your record is inserted in database`)
            res.status(200).redirect('/')
        }
    })
})