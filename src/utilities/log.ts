import log4js from "log4js";

log4js.configure({
    appenders: { 
        out: { type: "stdout" },
        file: { type: "dateFile", filename: "app.log", pattern: "yyyy-MM-dd-hh", compress: true }
    },
    categories: { 
        default: { 
            appenders: ["out", "file"],
            level: "debug"
        }
    },
});

const logger = log4js.getLogger('LoginServer');
logger.level = "debug";

export default logger;