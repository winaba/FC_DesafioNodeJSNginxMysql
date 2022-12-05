const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};


const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql_select = `INSERT INTO people(name) values('Wagner')`

connection.query(sql_select)

var results = {}

connection.query('SELECT * FROM people',  function(err, result) {
    
    if (err) throw err;

    results = result;
    console.log(result)
});

console.log(results)

connection.end()

app.get('/', (req, res) => {
    
    var data = JSON.parse(JSON.stringify(results));

    console.log(data)

    var html_tables = '<table border="1"><tr><td>Id</td><td>Nome</td></tr>';      

    for (idx in data) {
        html_tables = html_tables + '<tr><td>'+data[idx].id+'</td><td>'+data[idx].name+'</td></tr>'
    }

    html_tables = html_tables + '</table>' ;

    res.send('<h1>Full Cycle Rocks!</h1><br>'+html_tables)
})

app.listen(port, ()=> {
    console.log('Rodando na porta '+ port)
})