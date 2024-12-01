const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to the Timestamp Microservice API!",
        usage: "/api/:date?",
    });
});

app.get("/api/:date?", (req, res) => {
    const { date } = req.params;

    let parsedDate;
    if (!date) {
        parsedDate = new Date();
    } else if (!isNaN(date)) {
        parsedDate = new Date(parseInt(date));
    } else {
        parsedDate = new Date(date);
    }
    if (isNaN(parsedDate.getTime())) {
        return res.json({ error: "Invalid Date" });
    }
    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString(),
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
