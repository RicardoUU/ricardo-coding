var total = 0;
var a = 0;
var result = []

function foo(a) {
  var i = 0;
  for(;i < 3; i++) {
    result[i] = function() {
      total+= i*a;
      console.log(total);
    }
  }
}
foo(1);
result[0]();
result[1]();
result[2]();