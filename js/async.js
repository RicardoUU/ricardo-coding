async function func1() {
  console.log(1111);
  await func2();
  console.log(222)
  await console.log('awiait2');
  console.log('awiait2222')
}

async function func2() {
  console.log(3333);
}

console.log(44444);
func1()

setTimeout(()=>{
  console.log(5555)
},0)

new Promise((resolve)=>{
  console.log(6666)
  resolve()

}).then(res=> {
  console.log(7777)
})
.then(res=> {
  console.log(8888)
})

