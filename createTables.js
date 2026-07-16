const db = require("./config/db");

const queries = [

`CREATE TABLE IF NOT EXISTS portfolio(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(150),
description TEXT,
image VARCHAR(255)
)`,

`CREATE TABLE IF NOT EXISTS bookings(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
service_type VARCHAR(100),
project_description TEXT,
status VARCHAR(50) DEFAULT 'Pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,

`CREATE TABLE IF NOT EXISTS schedules(
id INT AUTO_INCREMENT PRIMARY KEY,
booking_id INT,
visit_date DATE,
status VARCHAR(30) DEFAULT 'Pending'
)`,

`CREATE TABLE IF NOT EXISTS payments(
id INT AUTO_INCREMENT PRIMARY KEY,
booking_id INT,
amount DECIMAL(10,2),
reference_number VARCHAR(100),
status VARCHAR(30) DEFAULT 'Pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,

`CREATE TABLE IF NOT EXISTS tracking(
id INT AUTO_INCREMENT PRIMARY KEY,
booking_id INT,
progress INT DEFAULT 0,
current_stage VARCHAR(100),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,

`CREATE TABLE IF NOT EXISTS notifications(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
title VARCHAR(150),
message TEXT,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`,

`CREATE TABLE IF NOT EXISTS messages(
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
sender ENUM('user','assistant'),
message TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

];

queries.forEach((sql,index)=>{

    db.query(sql,(err)=>{

        if(err){

            console.log(err);

        }else{

            console.log(`✅ Table ${index+1} Ready`);

        }

        if(index===queries.length-1){

            process.exit();

        }

    });

});