class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCounts = 0;
    // this.isRun = false;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
    // console.log(promiseCreator)
    if(this.maxCount > this.runCounts) { // 并发数
      this.request();
    }
  }
  // taskStart() {
  //   // 并发数
  //   for (let i = 0; i < this.maxCount; i++) {
  //     // console.log(111)
  //      this.request();
  //     // this.runCounts++;
  //   }
  // }
  request() {
    // console.log(this.queue)
    if (!this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    // 递归
    this.queue.shift()().then(() => {
      this.runCounts--;
      // console.log(222)
      this.request();
    });
    console.log('ccc:'+this.runCounts)

  }
}

// 递归法
// class Scheduler {
//   static max = 2;
//   constructor() {
//     this.count = 0;
//     this.tasks = []; // 存放待运行的任务
//     // this.task;
//   }

//   add(promiseCreator) {
//     if (this.count < Scheduler.max) {
//       this.count++;
//       this.start(promiseCreator);
//     } else {
//       this.tasks.push(promiseCreator);
//     }
//     console.log(111111)

//     // return this.task;
//   }

//   async start(promiseCreator) {
//     // this.count += 1;
//     await promiseCreator();
//     // this.count -= 1;
//     if (this.tasks.length) {
//       this.start(this.tasks.shift());
//       // 为什么不直接this.tasks.shift()()? 
//       // 一方面是为使用count，另一方面因为队列中的任务应尽早执行
//       // 即addTask(400, '4')应排在addTask(300, '3')后，而不是addTask(1000, '1')后
//       // 正常整个过程应持续1200ms，若直接this.tasks.shift()()则需要1400ms
//     }
//   }
// }

   
const timeout = time => new Promise(resolve => {
  setTimeout(resolve, time);
})
  
const scheduler = new Scheduler();
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}
  
  
addTask(1000, '1');
addTask(500, '2');
addTask(600, '3');
addTask(400, '4');
// addTask(100, '1');
// addTask(200, '2');
// addTask(400, '4');

// addTask(400, '5');
// addTask(400, '5');
// addTask(400, '5');
// addTask(400, '5');

// addTask(400, '6');
// addTask(400, '6');
// addTask(400, '6');
// addTask(400, '6');

// addTask(400, '7');
// addTask(400, '7');
  
// scheduler.taskStart()