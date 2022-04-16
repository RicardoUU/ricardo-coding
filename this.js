var count = 1;

const user = {
  count: 2,
  acount: {
    getCount: function() {
      // console.log(this);
      return this.count;
    },
    count: 3,
    // getCount: () => {
    //   // this.count = 4
    //   console.log(this);
    //   return this.count;
    // }
  },
  // getCount: () => {
  //   // this.count = 4
  //   console.log(this);
  //   return this.count;
  // }
}



var a = user;
var a1 = user.acount;
var a2 = user.acount.getCount();
var a3 = user.acount.getCount;
console.log(user.acount.getCount());
console.log(a1.getCount());
console.log(a2);
// console.log(a3());
console.log(user.acount.getCount());
// user.getCount()
// var o = {
//   a:10,
//   b:{
//       a:12,
//       fn:function(){
//           console.log(this.a); //12
//       }
//   }
// }
// o.b.fn();
