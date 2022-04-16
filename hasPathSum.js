// leetcode 112
/**
 * 方法1 广度优先遍历
 * 维护两个队列 1、节点遍历队列  2、路径节点sum的队列
 * 遍历当前节点时，和节点的左右节点入遍历队列，节点对应sum入sum队列（左右节点都存在时sum入两次）；
 * 
 */


/**
 * 方法2 递归
 */
const result = []
const tree = {
  val:1,
  leftNode:{
    val:2,
    leftNode:{
      val:4
    },
    rightNode: {
      val:5
    }
  },
  rightNode: {
    val:3,
    leftNode:{
      val:4
    },
    rightNode: {
      val:7
    }
  }
}
 function hasPathSum(root, sum, path = []) {
    if(!root) {
      return;
    }
    const paths = Array.from(path);
    paths.push(root.val);
    if(root.leftNode) {
      hasPathSum(root.leftNode, sum-root.val, paths);
    }
    if(root.rightNode) {
      hasPathSum(root.rightNode, sum-root.val, paths);
    }
    if(sum - root.val === 0){
      result.push(paths);
    }
 }
 hasPathSum(tree,8,[]);
 console.log(result);