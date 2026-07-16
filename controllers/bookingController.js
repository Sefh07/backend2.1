const db = require("../config/db");

// Create Booking
const createBooking = (req, res) => {

    const {
        user_id,
        service_title,
        project_description,
        booking_date
    } = req.body;

    db.query(
        "INSERT INTO bookings(user_id, service_title, project_description, booking_date) VALUES(?,?,?,?)",
        [
            user_id,
            service_title,
            project_description,
            booking_date
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                success: true,
                message: "Booking created successfully.",
                bookingId: result.insertId
            });

        }
    );

};

// Get all bookings
const getBookings = (req, res) => {

    db.query(
        "SELECT * FROM bookings ORDER BY created_at DESC",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

};

// Get one booking
const getBookingById = (req, res) => {

    db.query(
        "SELECT * FROM bookings WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }

            res.json(result[0]);

        }
    );

};

// Update booking
const updateBooking = (req, res) => {

    const {
        service_title,
        project_description,
        booking_date,
        status
    } = req.body;

    db.query(
        `UPDATE bookings
         SET service_title=?,
             project_description=?,
             booking_date=?,
             status=?
         WHERE id=?`,
        [
            service_title,
            project_description,
            booking_date,
            status,
            req.params.id
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Booking updated successfully."
            });

        }
    );

};

// Delete booking
const deleteBooking = (req, res) => {

    db.query(
        "DELETE FROM bookings WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                success: true,
                message: "Booking deleted successfully."
            });

        }
    );

};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
};