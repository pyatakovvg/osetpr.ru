
import winston from 'winston';


export default winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf(info => {
      return `{"@l": ${JSON.stringify(info.level)}, "@m": ${JSON.stringify(info.message)} , "@t": ${JSON.stringify(info.timestamp)}}`;
    })
  ),
  transports: [
    new winston.transports.Console({ colorize: true }),
  ],
});
