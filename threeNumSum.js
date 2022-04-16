var threeSum = function(nums) {
  let map = new Map()
  let result = []
  for(let i = 0; i < nums.length - 2; i++) {
      // 第一个数
      let first = nums[i]
      for(let j = i+1; j < nums.length; j++) {
          // 第三个数
          let second = 0 - nums[j] - first
          if(map.has(second)) {
              result.push([first, second, nums[j]])
          }
          map.set(nums[j], j)
      }
      map.clear()
  }
  return result
};

// 测试
var nums = [-1, 0, 1, 2, -1, -4]
const res = threeSum(nums)
console.log(res);
// [[-1,0,1],[-1,2,-1],[0,1,-1]]
// 存在重复元组

