"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const config_1 = require("./config");
const server = http.createServer(app_1.app);
server.listen(config_1.config.PORT, () => {
    console.log('Listen 5000');
});
process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});
process.on('unhandledRejection', error => {
    console.log(error);
});
//# sourceMappingURL=index.js.map