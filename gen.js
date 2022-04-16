// const username = 'ricardo'
// const template = `"亲爱的${username}`;
// console.log(template)
const template = "亲爱的${username}，中秋大促~，送你一张${coupon}优惠券，你感兴趣的${sku1} 和${sku2} 都能用！";


const data = {
  username: "小橘子",
  coupon: "12元",
  sku1: "冰鲜澳洲牛腩500g",
  sku2: "鲜鸡蛋（草鸡蛋）8枚400g",
};

const generateMessage = (template, data) => {
  // 实现es6 模版字符串
  const regexp = /\$\{(\w+)\}/;     
  if (regexp.test(template)) {        
      const values = regexp.exec(template);
      console.log(values)
      const key = regexp.exec(template)[1];    
      // console.log(key)
      template = template.replace(regexp, data[key]); 
      // 递归
      return generateMessage(template, data); 
  }    
  return template; 
}

const message = generateMessage(template, data);
console.log(message)
message === "亲爱的小橘子，中秋大促~，送你一张12元优惠券，你感兴趣的冰鲜澳洲牛腩500g 和鲜鸡蛋（草鸡蛋）8枚400g 都能用！"



// 
// // <!-- // ## 请在下方进行输入 ( 支持Markdown、插入公式及 LaTex 数学公式，点击上方按钮“环境说明”查看详情 ) -->
// // <!-- // ```wssa``` -->
// // <!-- for(let i=0; i<3; i++){ -->
// // <!--   console.log('hello world') -->
// // <!-- } -->
// // <!--  -->
// // ## 请在下方进行输入 ( 支持Markdown、插入公式及 LaTex 数学公式，点击上方按钮“环境说明”查看详情 )

//  1 2 5 

