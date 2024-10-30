import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { isLocal } from './helpers.js';

const { combine, timestamp, printf, simple } = format;
const { Console, DailyRotateFile } = transports;

const Logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ level, message, timestamp, ...meta }) => {
      const extraData = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : '';
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${extraData}`;
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: 'storage/logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    }),
  ],
});

if (isLocal()) {
  Logger.add(new Console({ format: simple() }));
}

export default Logger;
