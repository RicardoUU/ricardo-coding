function lazyMan(name) {
  // 返回一个可以对象
  return new Lazy(name)
}

class Lazy {

  constructor(name) {
      this.tasks = []
      this.tasks.push(() => {
          console.log('Hi!This is ' + name + '.');
          this.then();
      });
      // 随后执行
      setTimeout(() => {
          this.then();
      })
  }

  eat(name) {
      // 从后进任务数组
      this.tasks.push(() => {
          console.log('Eat ' + name + '.');
          this.then();
      })
      return this;
  }

  sleep(time) {
      // 从后进任务数组
      this.tasks.push(() => {
          console.log('等待 ' + time + '秒.');
          setTimeout(() => {
              console.log('wake up after ' + time + ' seconds.');
              this.then();
          }, time * 1000)
      });
      return this;
  }

  sleepFirst(time) {
      // 从前进任务数组
      this.tasks.unshift(() => {
          console.log('等待 ' + time + '秒.');
          setTimeout(() => {
              console.log('wake up after ' + time + ' seconds.');
              this.then();
          }, time * 1000)
      });
      return this;
  }

  // 执行任务数组里的方法
  then() {
      let task = this.tasks.shift();
      task && task();
      return this;
  }

}

// lazyMan("Smith").sleepFirst(5).eat("lunch").sleep(3).eat('dinner');


class U {
 constructor() {
     this.promise = Promise.resolve();
 }
 
 console(val) {
     this.promise = this.promise.then(() => {
        console.log(val);
     });
     return this;
 }
 
 setTimeout(wait) {
     this.promise = this.promise.then(() => {
         return new Promise(resolve => {
             setTimeout(() => {
                 resolve()
             }, wait);
         });
     })
     return this;
 }
}
const u = new U()
u.console('breakfast').setTimeout(1000).console('hahahah')
// lazyMan("Smith").sleepFirst(5).eat("lunch").sleep(3).eat('dinner');
