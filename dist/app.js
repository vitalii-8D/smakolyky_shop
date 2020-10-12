"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const config_1 = require("./config");
dotenv.config({});
// Обмеження на кількість запитів за одиницю часу
const serverRequestLimit = rateLimit({
    windowMs: 10000,
    max: 100 // TODO ad this to .dotenv
});
class App {
    constructor() {
        this.app = express();
        this.configureCors = (origin, callback) => {
            const whiteList = config_1.config.ALLOWED_ORIGIN.split(';');
            if (!origin) {
                return callback(null, true);
            }
            if (!whiteList.includes(origin)) {
                return callback(new Error('Cors not allowed'), false);
            }
            return callback(null, true);
        };
        global.appRoot = path.resolve(process.cwd(), '../');
        // Logger
        this.app.use(morgan('dev'));
        // Захист
        this.app.use(helmet());
        this.app.use(serverRequestLimit);
        this.app.use(cors({
            origin: this.configureCors
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(global.appRoot, 'public')));
        // TODO router
        this.setupDB();
        this.app.use(this.customErrorHandler);
    }
    setupDB() {
        mongoose.connect(config_1.config.MONGODB_URL, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.log.bind(console, 'MONGO ERROR'));
    }
    customErrorHandler(err, req, res, next) {
        res
            .status(err.status || 500)
            .json({
            message: err.message || 'Unknown Error',
            code: err.code
        });
    }
    mountRoutes() {
        this.app.use('/admin', authRouter),
            this.app.use('/auth', adminRouter),
            this.app.use('/products', productRouter),
            this.app.use('/users', authRouter);
    }
}
exports.app = new App().app;
//# sourceMappingURL=app.js.map