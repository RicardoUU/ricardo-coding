/**
 * { a: { b: { c: { d: 1 } } }, aa: 2, c: [1, 2] } => 
 * { 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }
 */

// 要注意区分判断 对象 和 数组
function flatten(obj) {
    const result = {};

    const recurseHandle = (objValue, parKey) => {
      // 对象
      if(Object.prototype.toString.call(objValue) === '[object Object]') {
        let isEmpty = true; // 是否空对象
        for(let key in objValue) {
          isEmpty = false; // 是否空对象
          recurseHandle(objValue[key], parKey ? parKey + '.' + key : key)
        }

        if(isEmpty && parKey) { // 空对象
          result[parKey] = {};
        }

      }else if(Array.isArray(objValue)) { // 数组

        if(objValue.length) {
          objValue.forEach((vItem,vindex)=> {
            const arrValueKey = parKey ? `${parKey}[${vindex}]` : vindex;
            recurseHandle(vItem, arrValueKey)
          })
        }else { // 空数组
          result[parKey] = [];
        }
       
      }else { // 其他值
        result[parKey] = objValue
      }
    }
  recurseHandle(obj, '');
  return result;
}


function flatten1(obj){
  var result = {};

  function recurse(src, prop) {
      var toString = Object.prototype.toString;
      if (toString.call(src) == '[object Object]') {
          var isEmpty = true;
          for (var p in src) {
              isEmpty = false;
              recurse(src[p], prop ? prop + '.' + p : p)
          }
          if (isEmpty && prop) {
              result[prop] = {};
          }
      } else if (toString.call(src) == '[object Array]') {
          var len = src.length;
          if (len > 0) {
              src.forEach(function (item, index) {
                  recurse(item, prop ? prop + '[' + index + ']' : index);
              })
          } else {
              result[prop] = [];
          }
      } else {
          result[prop] = src;
      }
  }
  recurse(obj,'');

  return result;
}



function unflatten(data) {
  if (Object(data) !== data || Array.isArray(data))
      return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};
  for (var p in data) {
      var cur = resultholder,
          prop = "",
          m;
      while (m = regex.exec(p)) {
          cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
          prop = m[2] || m[1];
      }
      cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
}

const testObj = {
  a:{
    a:{
      b:{
        c:1
      }
    },
    aa:2
  },
  bb:{
    cc: [1,2,3],
    dd: 1,
    ee:{r:1}
  },
  hh: [{r:1},2]
}

const res = flatten(testObj)
const res1 = flatten1(testObj)
console.log(res);
console.log(res1);