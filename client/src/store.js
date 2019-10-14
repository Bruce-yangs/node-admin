import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_AUTHENTICATED: 'SET_AUTHENTICATED',//判断是否通过
    SET_USER: 'SET_USER'
};

/*数据源*/
const state = {
    isAuthenticated: false,//是否授权
    user: {}//相关用户信息
};
/*相当于获取相关信息*/
const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
};
/*修改提交数据 必须要 经过mutations*/
const mutations = {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) state.isAuthenticated = isAuthenticated;
        else state.isAuthenticated = false;
    },
    [types.SET_USER](state, user) {
        if (user) state.user = user;
        else state.user = { };
    }
};
/*异步操作 调用mutations */
const actions = {
    setAuthenticated: ({commit}, isAuthenticated) => {
        commit(types.SET_AUTHENTICATED,isAuthenticated)
    },
    setUser: ({commit}, user) =>{
        commit(types.SET_USER,user)
    },
    clearData: ({commit}) =>{
        commit(types.SET_AUTHENTICATED,false);
        commit(types.SET_USER,{});
    }
};


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
