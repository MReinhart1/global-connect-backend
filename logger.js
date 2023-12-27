const { createLogger, format, transports } = require('winston');
const { combine, timestamp, simple, label, prettyPrint } = format;


const logger = createLogger({
  format: combine(
    simple(),
    timestamp()
  ),
  transports: [new transports.Console()]
})

module.exports = { logger }
