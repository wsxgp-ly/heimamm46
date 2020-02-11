// 导入axios 
import axios from 'axios';

// 为了更加方便的设置每个模块的请求,一般会通过create创建 新的axios 对象
// 创建的对象 和axios 功能一样,但是 可以单独的为他设置自己的属性
// login  登录
// request 请求
// 创建登录页面独有的请求对象
const loginRequest = axios.create({
    //基地址
    baseURL:process.env.VUE_APP_URL,
    // 是否跨域
    withCredentials:true
})

// 用户等登录 接口
// 使用登录的请求对象,抽取方法并暴露
export function login(data) {
    return loginRequest({
        url:'/login',
        method:'post',
        data
    })
    
}