// import {b} from './b.mjs'
// console.log(b);
// export let message = 1;

import {bar,b} from './b.mjs';
console.log('11111')
export var a = 'aaaa'
export function foo() {
  console.log('ffff');
  // bar();
  // console.log('执行完毕');
}
bar();

console.log(b)

console.log('444')

// foo();