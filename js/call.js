Function.prototype.callFunc = function(context){
  var context = context || window		//undefined 时 this 绑定在全局
  context.fn = this
  var args = []
  for(var i = 1, len = arguments.length; i < len; i++){
      args.push(arguments[i])		//i 为1，除去第一个参数
  }
  var result = context.fn(...args); // context是fn的调用对象 既 this
  delete context.fn
  return result
}

Function.prototype.myCall = function (context = window, ...args) {
  if (this === Function.prototype) {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}


// bind 
Function.prototype.myBind = function (context,...args1) {
  if (this === Function.prototype) {
    throw new TypeError('Error')
  }
  const fn = this
  return function F(...args2) {
    // 判断是否用于构造函数
    if (this instanceof F) {
      return new fn(...args1, ...args2)
    }
    return fn.apply(context, args1.concat(args2))
  }
}

Function.prototype.myBind2 = function(context) {
	
	//保存函数本身
	let fn = this;
	
	// 可以支持柯里化传参，保存参数
	let arg = [...arguments].slice(1)
	
	// 返回一个函数
	return function() {
		
		//将原参数与返回函数的新参数拼接在一起
		//支持柯里化形式传参
		let newArg = arg.concat([...arguments])
		
		//返回函数
		return fn.myApply(context, newArg)
	}
}