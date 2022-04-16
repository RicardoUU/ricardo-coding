// import {message} from './a.mjs'
// console.log(message || 1) 

// export let b = 2;
// try{
//   console.log(message || 1) 
// }catch{

// }

// b.js
import {foo, a} from './a.mjs';
console.log('22222')
console.log(a)
foo();
export const b = 'bbb'
export function bar() { 
  console.log('bbbb')
  // if (Math.random() > 0.5) {
  // foo();
  // }
}
console.log('333333')