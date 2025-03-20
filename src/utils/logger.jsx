import { NODE_ENV } from "@src/Env.jsx";

const logError = (message, error) => {
  if (NODE_ENV !== "production") {
    console.error(message, error);
  }
};

const logInfo = (message) => {
  if (NODE_ENV !== "production") {
    console.info(message);
  }
};

const logWarn = (message) => {
  if (NODE_ENV !== "production") {
    console.warn(message);
  }
};

const log = (message) => {
  if (NODE_ENV !== "production") {
    console.log(message);
  }
};

export { logError, logInfo, logWarn, log };
