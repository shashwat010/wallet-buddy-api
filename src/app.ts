import { env } from "./yts.env";
import { Application } from "express";
import express = require("express");
import mongoose = require("mongoose");

export class App {
    public app: Application;

    /**
     * @param port Port Application listens on
     * @param middleware Array of middleware to be applied to app 
     * @param routes Array of express.Router objects for application routes
     * @param apiPath Base path for this api that will be prepended to all routes
     * @param staticPath path to folder for public files express will make available
     */
    constructor(
        private port: number,
        middleware: Array<any>,
        options: Array<any>,
        routes: Array<express.Router>,
        private apiPath: string = env().apiPath ? env().apiPath : '/api',
        private staticPath: string = env().staticPath ? env().staticPath :"public"
    ) {
        this.app = express();
        this.options(options);
        this.middleware(middleware);
        this.routes(routes);
        this.assets(this.staticPath);
    }

    /**
     * @param _middleware Array of middleware to be loaded into express app
     */
    private middleware(_middleware: any[]) {
        _middleware.forEach((m) => {
            this.app.use(m);
        });
    }

    private options(_options:any[]){
        _options.forEach(op => this.app.options(op));
    }

    public addMiddleWare(middleWare: any) {
        this.app.use(middleWare);
    }

    /**
     * Attaches route objects to app, appending routes to `apiPath`
     * @param routes Array of router objects to be attached to the app
     */
    private routes(routes: Array<express.Router>) {
        routes.forEach((r) => {
            this.app.use(`${this.apiPath}`, r);
        });
    }

    /* Enable express to serve up static assets*/
    private assets(path: string) {
        this.app.use(express.static(path));
    }

    /**
     * Creates a connection to a MongoDB instance using mongoose
     * @param uri MongoDB connection string
     */
    public mongoDB(uri: string) {
        const connect = () => {
            const options = { useNewUrlParser: true, useUnifiedTopology: true };
            mongoose.connect(uri)
                .then(() => {
                    console.log('DB connected successfully');
                    return;
                }).catch((error) => {
                    console.log("DB connection failed. \n", error);
                    return process.exit(1);
                });
        };
        
        connect();

        mongoose.connection.on("disconnected", connect);
    }

    public listen() {
        const PORT = (env().stage === 'dev') ? this.port : process.env.PORT || this.port;
        this.app.listen(PORT, () => {
            console.log(`[${env().stage}] - Server started at http://localhost:${this.port}${this.apiPath}`);
        });
    }
}
