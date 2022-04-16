// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
// 示例 1：

// 输入：matrix = [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ]
// 输出：[1,2,3,6,9,8,7,4,5]
// 示例 2：

// 输入：matrix = [
//   [1,2,3,4],
//   [5,6,7,8],
//   [9,10,11,12]
// ]
// 输出：[1,2,3,4,8,12,11,10,9,5,6,7]


function handleMatrix(matrix) {
  let rowIndex = 0;
  let colIndex = 0;

  let drectArr = [[0,1],[1,0],[-1,0],[-1,0]]; // 方向
  let curDerct = drectArr[0]; // 开始向右

  let curResultLen = 0; // 当前遍历数据的长度
  let resultLen = matrix[0].length * matrix.length;

  const result = []
  while(curResultLen < resultLen) {

    result.push(matrix[rowIndex][colIndex]);

    switch(curDerct[0]) {
      case 1:
        rowIndex+=1;
      case -1:
        rowIndex-=1;
    }

    switch(curDerct[1]) {
      case 1:
        colIndex+=1;
      case -1:
        colIndex-=1;
    }

    // 转向
 
    curResultLen ++;

  }

}


const matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]




