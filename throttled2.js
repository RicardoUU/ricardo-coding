function throttled2(fn, delay = 500) {
  let timer = null
  return function (...args) {
      if (!timer) {
          timer = setTimeout(() => {
              fn.apply(this, args)
              timer = null
          }, delay);
      }
  }
}