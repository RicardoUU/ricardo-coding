
/**
 * promise 失败在没达到次数时 重试 
 * 使用while 和 try catch 
 */

const retry = (fetchFn, times = 3) => {
    return new Promise(async (resolve, reject) => {
        while (times--) {
            console.log(times)
            try {
                const ret = await fetchFn();
                resolve(ret);
                break;
            } catch (err) {
                if (!times) reject(err)
            }
        }
    })
}

const fetch = () => {
    const n = Math.random();
    return new Promise((resolve, reject) => {
        if (n > 0.1) {
            reject(1);
        } else {
            resolve('666')
        }
    })
}
retry(fetch,5).then((e) => {
    console.log('resolve ' + e)
}).catch(e => {
    console.log('reject ' + e)
});





// implement2

/**
 * 计算入参数字 +1 的结果，50% 几率成功，50% 几率失败
 * @param {number} num 要计算的数字
 */
 const plusNum = async function (num) {
    console.log('正在获取', num, '的计算结果')
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            if (Math.random() < 0.5) resolve(num + 1);
            else reject(`无法计算 ${num} + 1`);
    
        }, Math.floor(Math.random() * 5000));
    });
}

/**
 * 0-10 的步进数组
 */
const numArray = Array.from({ length: 10 }).map((_, index) => index)

/**
 * 错误重试包装器
 * 
 * @param {async function} asyncFunc 要包装的异步函数
 * @param {number} defaultRetryTime 默认的重试次数
 * @param {number} retryInterval 重试间隔时常
 * @returns 会自动进行错误重试的异步函数
 */
const retryWarpper = function (asyncFunc, defaultRetryTime = 3, retryInterval = 1000) {
    let retryTime = defaultRetryTime

    const retryCallback = async function(...args) {
        try {
            return await asyncFunc(...args)
        }
        catch (e) {
            if (retryTime <= 0) throw e

            console.log(`${args} 查询失败，将在 ${retryInterval} 毫秒后重试，剩余重试次数 ${retryTime}`)
            retryTime -= 1
            await new Promise(reslove => setTimeout(reslove, retryInterval))
            return await retryCallback(...args)
        }
    }

    return retryCallback
}

/**
 * 控制并发数量
 * 
 * @param {any[]} collection 待执行的任务数组
 * @param {number} limit 最大并发数量
 * @param {async function} asyncCallback 要执行的异步回调
 */
const concurrent = async function (collection, limit, asyncCallback) {
    // 用于在 while 循环中取出任务的迭代器
    const taskIterator = collection.entries();
    // 任务池
    const pool = new Set();
    // 最终返回的结果数组
    const finalResult = [];
    // 最终返回的异常数组
    const finalError = [];

    do {
        const { done, value: [index, task] = [] } = taskIterator.next();
        // 任务都已执行，等待最后的剩下的任务执行完毕
        if (done) {
            await Promise.allSettled(pool);
            break;
        };

        // 将结果存入结果数组，并从任务池中移除自己
        const promise = retryWarpper(asyncCallback)(task)
            .then(data => finalResult[index] = data)
            .catch(error => finalError[index] = { error, task })
            .finally(() => pool.delete(promise))

        // 达到上限后就等待某个任务完成
        if (pool.add(promise).size >= limit) {
            await Promise.race(pool);
        }
    } while (true)

    return [finalError, Array.from(finalResult)];
}

const run = async function() {
    const [errors, results] = await concurrent(numArray, 3, plusNum);
    console.log('所有报错', errors)
    console.log('所有结果', results)
}

run()