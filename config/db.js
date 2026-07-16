const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",          // XAMPP default
    database: "design_booking_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("✅ MySQL Connected");
    }
});

module.exports = db;