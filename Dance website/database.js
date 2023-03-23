const mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    database : 'dancewebsite',
    user: 'root',
    password: ''
})

connection.connect((error)=>{
    if(error){
        throw error;
    }
    else{
        console.log("Database is connected successfully")
    }
})

module.exports = connection;