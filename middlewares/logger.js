const winston = require("winston");
const expressWinston = require("express-winston");

// Custom format for console
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, timestamp, meta }) =>
      `${timestamp} ${level}: ${meta?.error?.stack || message}`
  )
);

// ✅ Request Logger (logs all incoming requests)
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

// ✅ Error Logger (logs errors after routing)
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
