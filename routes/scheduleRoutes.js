const express = require("express");
const router = express.Router();

const {
    scheduleVisit,
    getSchedules,
    updateSchedule,
    deleteSchedule
} = require("../controllers/scheduleController");

router.post("/", scheduleVisit);
router.get("/", getSchedules);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;