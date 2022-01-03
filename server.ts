import { env } from "./src/yts.env";
import { App } from "./src/app";
import { middleware } from "./src/middleware";
import { allRoutes } from "./src/routes/routes.module";

const port: number = env().port ?? 8080;
let dbConString;

/* Configure App instance*/
const app = new App(
  port,
  middleware,
  [...allRoutes]
);

try {
  const {user, pw, name, account} = env().db;
  dbConString = env().db.uri(user,pw,name,account);
} catch(e) {
  console.log(e);
  console.log("Failed to create DB Connection string");
}

/* Connect to MongoDB*/
dbConString ? app.mongoDB(dbConString) : console.log("Not Starting MongoDB Connection");

/* Launch!*/
app.listen();
