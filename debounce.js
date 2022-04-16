function debounce(func, wait) {
  let timeout;

  return function () {
      let context = this; // 保存this指向
      let args = arguments; // 拿到event对象

      clearTimeout(timeout)
      timeout = setTimeout(function(){
          func.apply(context, args)
      }, wait);
  }
}
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
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  const argList = Array.from(arguments)

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  const collect = function () {
    // argList.push(...arguments)
    if(arguments.length) 
    {
      argList.push(...arguments)
      return collect
    }else{
      return argList.reduce((a, b) => a + b, 0)
    }
  }
  // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  // collect.toString = function () {
  //   return 0+argList.reduce((a, b) => a + b, 0)
  // }

  return collect
}
