const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

console.log("✅ authRoutes.js loaded");

router.get("/test", (req, res) => {
    res.send("Auth Route Works!");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;