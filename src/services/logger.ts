import { createLogger, format, transports } from "winston";
const { combine, timestamp, errors, prettyPrint } = format;

// const logFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    prettyPrint()
  ),
  //   defaultMeta: { service: "user-service" },
  transports: [new transports.Console()],
});

export default logger;
