import express, {Express, Request, Response} from "express"
import mongoose from "mongoose";
import cors from "cors"
import {config} from './config'
import { registerRoutes } from "./routes";
const PORT = 8000;

const app:Express = express();

app.use(express.json());
app.use(cors());

(async function startup() {
    try {        
        await mongoose.connect(config.mongo.url, {w:"majority", retryWrites:true, authMechanism: "DEFAULT"})
        console.log("Connection to MongoDB successfully made");

        registerRoutes(app);
        
        app.listen(PORT, () => {
            console.log(`Server listing on port ${PORT}`);
        })

    } catch (error) {
        console.log("Could not make a connection to the database");
    }
})();

