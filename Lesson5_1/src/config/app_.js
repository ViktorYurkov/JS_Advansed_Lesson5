var mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1973"
});

const connectDB = () => {
   return con.connect(function (err) {
    if (err) {
        console.log("Error!");
    }else{
        console.log("Connected!");
       // return con;//
    }
    
});
}

module.exports = {
    connectDB
};

