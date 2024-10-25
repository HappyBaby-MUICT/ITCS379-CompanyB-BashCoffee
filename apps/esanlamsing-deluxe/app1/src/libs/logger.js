const pino = require('pino')
const pretty = require('pino-pretty')

export const logger = pino(pretty())