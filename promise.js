Promise.resolve().then(()=>{
  console.log(11);
})

console.log(111)

f = async ()=>{
  try{
    return 1;
  }finally{
    alert();
  }
};

f();


console.log(2222);