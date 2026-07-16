const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    try {

        const {
            fullname,
            phone,
            address,
            email,
            password
        } = req.body;

        if (!fullname || !phone || !address || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                if (err) return res.status(500).json(err);

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists."
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(
                    "INSERT INTO users(fullname,phone,address,email,password) VALUES(?,?,?,?,?)",
                    [
                        fullname,
                        phone,
                        address,
                        email,
                        hashedPassword
                    ],
                    (err) => {

                        if (err)
                            return res.status(500).json(err);

                        res.json({
                            success: true,
                            message: "Registration Successful."
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};

const login = (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {

                return res.status(400).json({
                    message: "Invalid Email"
                });

            }

            const user = result[0];

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {

                return res.status(400).json({
                    message: "Incorrect Password"
                });

            }

            const token = jwt.sign(

                {
                    id: user.id
                },

                "secretkey",

                {
                    expiresIn: "1d"
                }

            );

            res.json({

                success: true,

                token,

                user: {

                    id: user.id,

                    fullname: user.fullname,

                    email: user.email

                }

            });

        }

    );

};

module.exports = {

    register,

    login

};