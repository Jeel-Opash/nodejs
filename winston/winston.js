const { createLogger, format, transports } = require("winston")
const Mongotransport = require("./mongotransport")

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
    new Mongotransport()
  ]
})

module.exports = logger