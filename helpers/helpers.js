export function debounce (fn, wait) {
  let timeoutID

  return function (...args) {
    clearTimeout(timeoutID)
    const that = this
    timeoutID = setTimeout(() => fn.apply(that, args), wait)
  }
}
