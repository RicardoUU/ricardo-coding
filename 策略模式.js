/**
 * 策略类
 */

// 普通会员策略类
class RegularCard {
    calculate(deposit) {
      return deposit * 0.1;
    }
  }
  
  // 金卡会员策略类
  class GoldCard {
    calculate(deposit) {
      return deposit * 0.2;
    }
  }
  
  // 白金卡会员策略类
  class PlatinumCard {
    calculate(deposit) {
      return deposit * 0.3;
    }
  }
  
   
  /**
   * 奖金类(对应环境类Context)
   */
  class Bonus {
    constructor() {
      this.deposit = null; // 预存款
      this.strategy = null; // 会员等级对应的策略对象
    }
    // 设置顾客的预存款
    setSalary( deposit ) {
      this.deposit = deposit;    // 设置顾客的预存款
    }
    // 设置顾客的会员等级对应的策略对象
    setStrategy( strategy ) {
      this.strategy = strategy;    // 设置顾客的会员等级对应的策略对象
    };
    // 取得赠款金额
    getBonus() { 
      return this.strategy.calculate( this.deposit ); // 把计算赠款的操作委托给对应的策略对象
    };
  }
  



  // implement2 
  // 策略类
// 所有跟计算奖金有关的逻辑不再放在环境类Context中，而是分布在各个策略对象中。
let strategies = {
    // 每个策略对象负责的算法被各自封装在对象内部
    "RegularCard": function( deposit ){
        return deposit * 0.1;
    },
    "GoldCard": function( deposit ){
        return deposit * 0.2;
    },
    "PlatinumCard": function( deposit ){
        return deposit * 0.3;
    }
};
// 奖金类(对应环境类`calculateBonusContext)
// 环境类Context并没有计算奖金的能力，而是把这个职责委托给了某个策略对象
let calculateBonus = (vipLevel,deposit) => {
    return strategies[vipLevel](deposit);
}

// 替换Context中当前保存的策略对象，便能执行不同的算法来得到我们想要的结果
console.log('GoldCard', 2000) // 输出：400
console.log('RegularCard', 1000) // 输出：100
