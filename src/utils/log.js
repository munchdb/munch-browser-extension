import {LOG_PREFIX} from '../constants'

export function log () {
  let args = Array.prototype.slice.call(arguments)
  args.unshift(LOG_PREFIX)
  console.log.apply(console, args)
}
