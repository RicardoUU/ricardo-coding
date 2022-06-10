/**\
 * 随机获取数组元素
 */

const randomly = arr => arr[Math.floor(Math.random() * arr.length)];

randomly([1, 3, 5, 7, 9, 11]);