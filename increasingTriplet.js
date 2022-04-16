
// 递增的三元子序列 leetcode334
var increasingTriplet = function(nums) {
  const n = nums.length;
  if (n < 3) {
      return false;
  }
  let first = nums[0], second = Number.MAX_VALUE;
  for (let i = 1; i < n; i++) {
      const num = nums[i];
      if (num > second) {
          console.log(1);
          return true;
      } else if (num > first) {
          console.log(2);
          second = num;
      } else { // num < first
          console.log(3);
          first = num;
      }
  }
  return false;
};
const nums = [3,1,2,0,4,6]
const nums1 = [6,2,3,4,5]
// console.log(increasingTriplet(nums)) 
function mySolve(nums) {
  let curIndex = 0;
  let curItem = nums[curIndex];
  let result = [];
  for(let index = 1; index < nums.length; index++) {
    if(curItem < nums[index]) {
      // curItem = nums[index];
      if(result.length === 0) {
        result.push(curItem);
      }
      result.push(nums[index]);
      curIndex = index;
      curItem = nums[curIndex];
    } else {
      curIndex = index;
      curItem = nums[curIndex];
      result = [];
      // console.log(index)
    }
    if(result.length === 3) {
      return result;
    }
  }
  return false;
}

console.log(mySolve(nums)) 
console.log(mySolve(nums1)) 
