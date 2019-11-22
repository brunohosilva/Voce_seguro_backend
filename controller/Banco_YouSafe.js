var mysql = require('mysql');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
require('dotenv').config()

let host = process.env.HOST_DB
let user = process.env.USER_DB
let pass = process.env.PASSWORD_DB
let database = process.env.DATABASE_DBgit 

exports.connectDataBase = function(req, res) {
    const con = mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: database
    });

    fs.createReadStream('./data/carsteal.csv')
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const resultLatLon = results.map((position) => {
                const latitude = position.LATITUDE.replace(/\,/g, '.')
                const longitude = position.LONGITUDE.replace(/\,/g, '.')
                const rua = position.LOGRADOURO
                if (position.LATITUDE !== null) {
                    con.query(`INSERT INTO crimes(latitude,longitude,crime) VALUES(${parseFloat(latitude)},${parseFloat(longitude)},'furto de veiculo')`, function(err, result) {
                        if (err) throw err;
                        console.log("result");
                    })
                }
            })
        })
}