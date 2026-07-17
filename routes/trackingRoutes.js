const express = require("express");
const router = express.Router();

const {
    getTracking,
    updateTracking
} = require("../controllers/trackingController");

router.get("/", getTracking);
router.get("/:id", getTracking);
router.post("/", getTracking);
router.delete("/:id", getTracking);
router.put("/:id", updateTracking);

module.exports = router;