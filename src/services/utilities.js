import * as moment from 'moment'

const K = {name: 'K', value: 1024}
const M = {name: 'M', value: K.value * 1024}
const G = {name: 'G', value: M.value * 1024}
const units = [ K, M, G ]

export function size(size) {
  let ret = size
  for (let i = units.length - 1; i >= 0; i--) {
    if (size > units[i].value) {
      ret = (size / units[i].value).toFixed(1) + units[i].name
      break
    }
  }
  return ret
}

export function date(date) {
  return moment(new Date(date * 1000)).fromNow()
}

export function duration(duration) {
  return moment(new Date() + (duration * 1000)).fromNow()
}
