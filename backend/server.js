import mongoose from "mongoose";
import app from './app.js'
import * as dotenv from 'dotenv';

dotenv.config({ encoding: "latin1" });
const port = process.env.SERVER_PORT || 4000;

const startServer = () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    // Demarrage serveur
    .then(() =>
        app.listen(port, () => {
            console.log(
                `This server is running on port ${port}. Enjoy !`
            );
        })
    )
    // Arret du serveur si connection impossible
    .catch(() => console.log("Server connection failed !"))
};

startServer();