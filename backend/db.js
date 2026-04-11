const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hello_app'
});

connection.connect((err) => {
    if(err) {
        console.error('DB not connected: ', err);
        return;
    }
    console.log('DB Connection succesful');
});

module.exports = connection;