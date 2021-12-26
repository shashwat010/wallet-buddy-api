import { exit } from "process";
import { IEnv } from "../interfaces/IEnv";
import { IEnvironmentType } from "../interfaces/yts.types";

export const env: () => IEnv = () => {
  const _environment: IEnvironmentType = <IEnvironmentType>process.env.ENVIRONMENT || 'dev';

  if (_environment === "dev") {
    let env = require("./dev.env");
    return env;
  } else if (_environment === "production") {
    let env = require("./prod.env");
    return env;
  } else if (_environment === "staging"){
    let env = require("./qa.env");
    return env;
  } else {
    console.log(
      `Error. shell variable ENVIRONMENT not set. Acceptable values are 'dev' | 'production'`
    );
    exit(1);
  }
};
