class Permutation {
  constructor(arr) {
      this.arr = Array.from(arr);
      this.result = [];
      this.len = 0;
  }

  run(index) {
      if (index == this.arr.length - 1) {
          this.result.push(Array.from(this.arr));
          this.len++;
          return;
      }
      // 固定第一个 将剩下的元素进行全排列处理 
      // 将第一个元素与依次与第i（1<i<=arr.length）个元素互换，将剩下的元素进行全排列处理；
      for (let i = index; i < this.arr.length; i++) {
          [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]]; // 第一个和第i个换
          // console.log('1:'+this.arr)
          // console.log('index:'+ index +','+ 'i:'+ i + ',' + 'arr:' + this.arr)
          this.run(index + 1);
          [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]]; // 换回来
          // console.log('2:' + 'index:'+ index +','+ 'i:'+ i + ',' + 'arr:' + this.arr)

      }
  }

} 

// 第一次循环 index->0 arr => [1,2,3] index + 1 [1,2,3] index + 1 return [1,2,3]
//  index-> 1 [1,2,3]


const arr = [1,2,3];
const permuta = new Permutation(arr);

permuta.run(0);

console.log(permuta.result);
// console.log(permuta.arr);