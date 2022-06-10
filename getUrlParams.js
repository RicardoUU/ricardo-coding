/**
 * 获取url 参数
 */

 const getURLParams = url =>
 (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
   (a, v) => (
     (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
   ),
   {}
 );

getURLParams('qq.com'); // {}
getURLParams('https://xx.com?name=tntweb&age=20');

console.log('https://xx.com?name=tntweb&age=20'.match(/([^?=&]+)(=([^&]*))/g)) 
// Array.reduce()