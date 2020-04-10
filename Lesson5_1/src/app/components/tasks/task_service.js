'use strict';
console.log('servis');

const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1973"
});

con.connect(function (err) {
    if (err) {
        console.error("Error: " + err.message);
        return;
    } else {
        console.log("Connected!");
    }
});

let nameTable = 'users';
let nameDB = 'myDB';
let name = '';
let mail = '';
let description = '';
var sql = '';

const requestSQL = (sql, result) => {
    con.query(sql, function (err, res) {
        if (err) {
            result(true, err);
        } else {
            result(false, res);
            //console.dir(res);
        }
    });
}

const createDB = (result) => {
    sql = "CREATE DATABASE IF NOT EXISTS " + nameDB + " CHAR SET UTF8";
    requestSQL(sql, result);
};

const useDB = (result) => {
    sql = "USE " + nameDB;
    requestSQL(sql, result);
};

const createTable = (result) => {
    sql = "CREATE TABLE IF NOT EXISTS " + nameTable + " (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), mail VARCHAR(50), description VARCHAR(255))";
    requestSQL(sql, result);
};

const getAllData = (result) => {
    sql = "SELECT * FROM " + nameTable;
    requestSQL(sql, result);
};

const taskValidation = (newUser) => {
    const {
        name,
        mail,
        description
    } = newUser;
    const user = {
        name,
        mail,
        description
        
    };
        for (let prop in user) {
            if (user.hasOwnProperty(prop) && user[prop] === undefined) {
                return false;
            };
        };
    return user;
}

const addData = (newUser, result) => {
    const user = taskValidation(newUser);
    if (!user){
        result(true, 'not data');
    }else{
       sql = "INSERT INTO " + nameTable + " (name, mail, description) VALUES ('" + user.name + "' , '" + user.mail + "' , '" + user.description + "')";
    //INSERT INTO users (name, age) VALUES (?,?)", [name, age]
    requestSQL(sql, result); 
    }
};

const removeData = (dataId, result) => {
    sql = "DELETE FROM " + nameTable + " WHERE id = " + dataId;
    requestSQL(sql, result);
};

//const user = ["Tom", 29];
//const sql = "INSERT INTO users(name, age) VALUES(?, ?)";
//const sql = `UPDATE users SET age=? WHERE name=?`;

const updateData = (dataId, data, result) => {
    //console.log('servis   updateTask');
    sql = "UPDATE " + nameTable + " SET ";
    const {
        name,
        mail,
        description

    } = data;
    const updatedUser = {
        name,
        mail,
        description

    };
    for (let prop in updatedUser) {
        if (updatedUser[prop] === undefined) {
            delete updatedUser[prop];
        } else {
            sql += prop + " = '" + updatedUser[prop] + "',";
        }
    }
    sql = sql.slice(0, -1) + " WHERE id = " + dataId;
    requestSQL(sql, result);
};

module.exports = {
    createDB,
    useDB,
    createTable,
    getAllData,
    addData,
    removeData,
    updateData
}
