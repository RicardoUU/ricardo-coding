function deepCopy(target) {
  if (
      Object.prototype.toString.call(target) !== '[object Object]' &&
      Object.prototype.toString.call(target) !== '[object Array]'
  ) {
      return target
  }

  const newTarget = Array.isArray(target) ? [] : {}

  Object.keys(target).forEach(
      (key) =>
      (newTarget[key] =
       target[key] instanceof Object ? deepCopy(target[key]) : target[key])
  )

  return newTarget
}

const cloneDeep = target => {
  // 判断如果不是 Object 或者 Array 就返回
  // 需要注意 typeof [] === 'object'
  if (typeof target !== 'object') {
    return target;
  }

  // 判断整体上是对象还是数组，之后往里面拷贝属性
  let newTarget = Array.isArray(target) ? [] : {};

  // 遍历对象或者数组中的每一项（属性）
  for (let key in target) {
    // 只对对象本身的属性进行拷贝，而不拷贝集成的属性（也就是原型链中的东西）
    if (target.hasOwnProperty(key)) {
      // 这里 target[key] 既包含对象，也包含数字字符串等，因为函数开头判断过了，不是对象和数组的直接返回
      newTarget[key] = cloneDeep(target[key]);
    }
  }

  return newTarget;
};


   // <!------------工具函数开始----------------------------!>
// 创建数据
function createData(deep, breadth) {
  var data = {};
  var temp = data;

  for (var i = 0; i < deep; i++) {
    temp = temp["data"] = {};
    for (var j = 0; j < breadth; j++) {
      temp[j] = j;
    }
  }
  return data;
}



// 获取类型
function getType(attr) {
  let type = Object.prototype.toString.call(attr);
  let newType = type.substr(8, type.length - 9);
  return newType;
}


// 判断是否为引用类型
function isObject(value) {
  // 储存传入值的类型
  const type = typeof value;
  // 过滤null
  return value != null && (type === "object" || type === "function");
}


// 克隆function
function cloneFunc(value) {
  const isFunc = typeof value === "function";
  if (isFunc) {
    return value;
  }
}

// 克隆symbol
function cloneSymbol(symbol) {
  // 保存方法
  const symbolValueOf = Symbol.prototype.valueOf;
  // 返回key
  return Object(symbolValueOf.call(symbol));
}

// 克隆RegExp
function cloneRegExp(regexp) {
  const reFlags = /\w*$/;
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

// 不可循环的类型 Number/String/Date/Boolean
function cloneStatic(target) {
  // 获取构造函数
  const Ctor = target.constructor;
  // 实例化一个同类型的属性
  return new Ctor(target);
}
// <!------------工具函数结束----------------------------!>




// <!------------克隆逻辑开始----------------------------!>
// 声明一个函数
function cloneDeep(target, map = new WeakMap()) {
  // 判断类型
  // console.log(isObject(target));
  if (!isObject(target)) {
    return target;
  }
  // console.log(111);
  let newTarget = {};
  switch (getType(target)) {
    case "Number":
    case "String":
    case "Boolean":
    case "Date":
      return cloneStatic(target);
    case "RegExp":
      return cloneRegExp(target);
    case "Function":
      return cloneFunc(target);
    case "Array":
      newTarget = [];
      break;
    case "Map":
      newTarget = new Map();
      break;
    case "Set":
      newTarget = new Set();
      break;
  }

  // 查询map中是否有存在原对象（target），如果存在直接返回
  if (map.has(target)) {
    return target;
  }
  // 如果map中不存在原对象（target），则储存进map中
  map.set(target, newTarget);

  // 拷贝Map
  if (getType(target) === "Map") {
    // 循环复制到新Map
    target.forEach((value, key) => {
      // 因为值有可能是一个对象、数组，所以要递归调用
      newTarget.set(key, cloneDeep(value, map));
    });
    return newTarget;
  }

  // 拷贝Set
  if (getType(target) === "Set") {
    // 循环复制到新Map
    target.forEach((value, key) => {
      // 因为值有可能是一个对象、数组，所以要递归调用
      newTarget.add(key, cloneDeep(value, map));
    });
    return newTarget;
  }

  // 循环对象 递归复制给新对象
  for (let key in target) {
    // 判断属性是否在对象本身上
    if (target.hasOwnProperty(key)) {
      // 递归调用
      newTarget[key] = cloneDeep(target[key], map); // <!------新增代码 参数map------!>
    }
  }
  // 返回新对象
  return newTarget;
}

const copy = source => {
  const _cp = source => {
      let dest;
      const type = getType(source);
      if (type === "Array") {
          dest = [];
          source.forEach((item, index) => {
              dest[index] = _cp(item);
          });
          return dest;
      } else if (type === "Object") {
          dest = {};
          for (let [k, v] of Object.entries(source)) {
              dest[k] = _cp(v);
          }
          return dest;
      } else {
          return source;
      }
  };

  return _cp(source);
};

const copy = source => {
  const set = new Set();
  const _cp = source => {
      let dest;
      if (set.has(source)) {
          return source;
      }
      set.add(source);
      const type = getType(source);
      if (type === "Array") {
          // 数组
          dest = [];
          source.forEach((item, index) => {
              dest[index] = _cp(item);
          });
          return dest;
      } else if (type === "Object") {
          // obj
          dest = {};
          for (let [k, v] of Object.entries(source)) {
              dest[k] = _cp(v);
          }
          return dest;
      } else {
          return source;
      }
  };

  return _cp(source);
};