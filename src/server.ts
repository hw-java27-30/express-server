import express, {Request, Response} from 'express';
import {PORT} from "./config/libConfig.js";
import {libRouter} from "./routes/libRouter.js";
import {errorHandler} from "./errorHandler/errorHandler.js";

export const launchServer = () => {
const app = express();
app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));

//==========================Middleware===================================
    app.use(express.json());


//==========================Router=======================================
    app.use('api', libRouter)
    app.use((_: Request, res: Response) => {
        res.status(404).send('Not Found');
    })
//==========================ErrorHandler=================================
    app.use(errorHandler)
}
