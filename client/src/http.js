import axios from 'axios';
import {Loading, Message} from 'element-ui';
import router from './router';

let loading = null;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,.7)',
    });
}

function closeLoading() {
    loading.close();
}


//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(response => {
    //结束加载动画
    closeLoading();
    return response;
}, error => {
    closeLoading();
    Message.error(error.response.data);
    //获取状态码
    const {status} = error.response;
    if(status == 401) {
        Message.error('token失效，请重新登录');
        localStorage.removeItem('eleToken');
        router.push('/login');
    }
    return Promise.reject(error);
});

export default axios;