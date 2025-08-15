import express, {Request, Response} from 'express';
import {db, PORT} from "./config/libConfig.js";
import {libRouter} from "./routes/libRouter.js";
import {errorHandler} from "./errorHandler/errorHandler.js";
import morgan from "morgan";
import * as fs from "node:fs";
import * as mongoose from "mongoose";
import dotenv from "dotenv";

export const launchServer = async () => {
    //=========load environments====================
    dotenv.config();
    console.log(process.env);
    const app = express();
    mongoose.connect(db).then(() => {
        console.log("Connected to MongoDB");
    })
    app.listen(process.env["PORT "], () => console.log(`Server runs at http://localhost:${process.env["PORT "]}`));
    const logStream = fs.createWriteStream("access.log", {flags: "a"});
//==========================Middleware===================================
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(morgan('combined', {stream: logStream}));


//==========================Router=======================================
    app.use('/api', libRouter)
    app.use((_: Request, res: Response) => {
        res.status(404).send('Not Found');
    })
//==========================ErrorHandler=================================
    app.use(errorHandler)
}
