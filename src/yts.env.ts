import { exit } from "process";
import { IEnv } from "./interfaces/IEnv";
import { IEnvironmentType } from "./interfaces/yts.types";

export const env: () => IEnv = () => {

  const _environment: IEnvironmentType = <IEnvironmentType>process.env.ENVIRONMENT || 'dev';

  if (_environment === "dev" || _environment === 'development') return require("./environment/dev.env");
  else if (_environment === "production") return require("./environment/prod.env");
  else if (_environment === "staging") return require("./environment/qa.env");
  else {
    console.log(`Error. shell variable ENVIRONMENT not set. Acceptable values are 'dev' | 'production'`);
    exit(1);
  }
};