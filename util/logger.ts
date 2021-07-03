import winston from "winston";
import moment from "moment";

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'vEX Logger' },
  transports: [
    new winston.transports.File({ filename: `error-${moment(Date.now()).utc().format('DD-MM-YYYY')}.log`, level: 'error', dirname: `log/${moment(Date.now()).utc().format('DD-MM-YYYY')}` }),
    new winston.transports.File({ filename: `info-${moment(Date.now()).utc().format('DD-MM-YYYY')}.log`, level: 'info', dirname: `log/${moment(Date.now()).utc().format('DD-MM-YYYY')}` }),
    new winston.transports.File({ filename: `debug-${moment(Date.now()).utc().format('DD-MM-YYYY')}.log`, level: 'debug', dirname: `log/${moment(Date.now()).utc().format('DD-MM-YYYY')}` }),
    new winston.transports.File({ filename: `full-${moment(Date.now()).utc().format('DD-MM-YYYY')}.log`, dirname: `log/${moment(Date.now()).utc().format('DD-MM-YYYY')}` }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      )
    }),
  ],
});

export default logger;