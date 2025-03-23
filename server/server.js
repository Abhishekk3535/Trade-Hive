const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config()

const ConnectDB = require("./config/db");
const Authrouter = require("./routes/auth");

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));


//Demo Route
app.get("/Health", (req, res) => {
    res.json("API is working fine")
});

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "index.html"));
// });

app.use("/api/auth", Authrouter);


//Server Staring and connecting Database

const PORT = process.env.PORT || 4000;   //PORT 
app.listen(PORT, async () => {
    try {
        await ConnectDB()
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.log("Error in Staring Server");
    }
});