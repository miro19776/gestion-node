const mysql = require('mysql')

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'gestions1'
})
con.connect((err)=>{
    if(err)
        {
            console.log(err)
        }else{
            console.log('connected to MySQL database!')
        }
})
module.exports = con;