function instanceOf (L,R){
  // L : 实例对象
  // R : 构造函数
  let O = R.prototype;
  L = L._proto_;
  while(true){
      if(L === Null){
          return false;
      }
      if(L === O){
          return true;
      }
      L = L._proto_;
  }
}
