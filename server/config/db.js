const mongoose = require("mongoose")

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Database");
        
    } catch (error) {
        console.log({Error: "Errro in connecting Databse", error});
    }
}

module.exports = ConnectDB