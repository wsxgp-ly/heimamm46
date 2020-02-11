// 验证手机号规则
export const checkPhone = (rule, value, callback) => {
    // 接收参数 value
    // 定义正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    // 使用正则校验格式是否满足
    if (reg.test(value) == true) {
      // 对
      callback();
    } else {
      // 错
      callback(new Error("手机号格式不对哦，请检查"));
    }
  };
  
  // 验证邮箱的 函数
  export const checkEmail = (rule, value, callback) => {
    // 接收参数 value
    // 定义正则表达式
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    // 使用正则校验格式是否满足
    if (reg.test(value) == true) {
      // 对
      callback();
    } else {
      // 错
      callback(new Error("邮箱格式不对哦，请检查"));
    }
  };