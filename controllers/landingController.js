const getLanding = (req, res) => {
    res.json({
        success: true,
        company: "MARC Interior Design",
        slogan: "Luxury Interior Design",
        about:
            "Every space tells a story. We transform ideas into beautiful interiors.",
        featuredWorks: [
            {
                id: 1,
                title: "Modern Living Room",
                image: "livingroom.jpg"
            },
            {
                id: 2,
                title: "Minimalist Kitchen",
                image: "kitchen.jpg"
            }
        ],
        services: [
            "Residential",
            "Commercial",
            "Book",
            "Chat"
        ]
    });
};

module.exports = {
    getLanding
};