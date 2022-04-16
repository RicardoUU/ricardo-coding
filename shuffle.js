
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5)
}


function shuffle(arr) {
  for (let i=arr.length;i;i--){
      // 产生一个随机位置
      let j = Math.floor(Math.random() * i);
      
      // 交换位置
      [arr[i-1],arr[j]] = [arr[j],arr[i-1]];    
  }
  return arr;
}
