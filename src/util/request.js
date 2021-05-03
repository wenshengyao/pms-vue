// 配置axios拦截器
import router from "@/router";
import axios from 'axios';
// axios.defaults.baseURL='http://192.168.222.130:8088/pms/'
axios.defaults.baseURL='/pms/api'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// 创建axios实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_URL, // api 的 VUE_APP_URL
    withCredentials:true,
    timeout: 50000 // 请求超时时间
});

// response 拦截器,数据返回后进行一些处理
service.interceptors.response.use(
    (response) => {
        let { data } = response;
        return data;
    },
    (error) => {
        let info = {},
            { status, statusText, data } = error.response
        if(status == 401){
            router.replace({
                path: '/login'
            })
            return info;
        }
        if(status == 403){
            router.replace({
                path: '/forbid'
            })
            return info;
        }
        if (!error.response) {
            info = {
                code: 5000,
                msg: 'Network Error'
            }
        } else {
            // 此处整理错误信息格式
            info = {
                code: status,
                data: data,
                msg: statusText
            }
        }
        return info;
    }
)
export default service