const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    database : 'portfolio',
    user : 'root',
    password : ""
})

connection.connect((err)=>{
    if(err){
        throw err
    }
    else{
        console.log("Database is connected sucessfully")
    }
})

module.exports = connection