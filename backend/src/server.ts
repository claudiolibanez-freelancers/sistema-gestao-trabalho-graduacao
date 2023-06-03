import "reflect-metadata";
import "dotenv/config";

// container
import "@shared/container";

// database
// import "@shared/infra/typeorm";

import { App } from "@shared/infra/http/App";

const port = Number(process.env.PORT) || 3333;
const app = new App({ port });

app.start();
