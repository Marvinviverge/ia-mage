import mongoose from "mongoose";
import app from './app.js'
import * as dotenv from 'dotenv';

dotenv.config({ encoding: "latin1" });

const startServer = () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    // Demarrage serveur
    .then(() =>
        app.listen(process.env.SERVER_PORT, () => {
            console.log(
                `This server is running on port ${process.env.SERVER_PORT}. Enjoy !`
            );
        })
    )
    // Arret du serveur si connection impossible
    .catch(() => console.log("Server connection failed !"))
};

startServer();