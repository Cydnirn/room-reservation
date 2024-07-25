import express, { Application } from "express";
import env from "#config/index";

import loader from "./loaders";
import { logger } from "#utils/Logger";
import { init } from "#config/db";

const app = express();

const ExecuteServer = (app: Application, port?: number) => {
    app.listen(port, () => logger.info(`Server running on port ${port} | ${env.ORIGIN}:${env.PORT}`));
};

const StartServer = () => {
    (async (app: Application) => {
        await loader(app);
        await init(env.NODE_ENV);
        if (env.NODE_ENV === "production") {
            ExecuteServer(app, 3002);
        } else if (
            env.NODE_ENV === "development" ||
            env.NODE_ENV === "testing"
        ) {
            ExecuteServer(app, 3001);
        }
    })(app);
};

StartServer();
