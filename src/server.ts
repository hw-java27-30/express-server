import express, {Request, Response} from 'express';
import {PORT} from "./config/libConfig.js";
import {libRouter} from "./routes/libRouter.js";
import {errorHandler} from "./errorHandler/errorHandler.js";
import morgan from "morgan";
import * as fs from "node:fs";
import {accountRouter} from "./routes/AccountRouter.js";

export const launchServer = () => {
const app = express();
app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));
const logStream = fs.createWriteStream("access.log", { flags: "a" });
//==========================Middleware===================================
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(morgan('combined', {stream: logStream}));


//==========================Router=======================================
    app.use('/accounts', accountRouter);
    app.use('/api', libRouter)
    app.use((_: Request, res: Response) => {
        res.status(404).send('Not Found');
    })
//==========================ErrorHandler=================================
    app.use(errorHandler)
}
