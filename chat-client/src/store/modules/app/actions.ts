import { SET_USER, SET_TOKEN } from './mutation-types';
import { ActionTree } from 'vuex';
import { AppState } from './state';
import { RootState } from '../../index';
import fetch from '@/api/fetch';
import { processReturn } from '@/utils/common.ts';

const actions: ActionTree<AppState, RootState> = {
  async register({ commit }, payload) {
    let res = await fetch.post('http://localhost:8080/users', {
      userName: payload.username, // 修改这里来匹配您用户对象的字段
      userPwd: payload.password,  // 同上
      userState: 'OFFLINE'
    });
    let data = processReturn(res);
    if (data) {
      commit(SET_USER, data.user);
      commit(SET_TOKEN, data.token);
      return data;
    }
  },
  async login({ commit }, payload) {
    console.log('----login-----');
    let res = await fetch.post('/login', {
      ...payload,
    });
    let data = processReturn(res);
    console.log(data)
    if (data) {
      commit(SET_USER, data.user);
      commit(SET_TOKEN, data.token);
      return data;
    }
  },
};

export default actions;
