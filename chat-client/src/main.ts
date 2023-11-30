import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Viewer from 'v-viewer';

Vue.config.productionTip = false;


// mock模拟数据，进行前端调试

import Mock from 'mockjs';
import './mock/login';  // 引入 Mock 登录接口
import './mock/data';  // 引入 Mock 数据接口



// 引入ant-design
import './ant-design';

// 引入moment
import moment from 'moment';
// 使用中文时间
Vue.prototype.$moment = moment;

// 图片预览插件
import 'viewerjs/dist/viewer.css';
Vue.use(Viewer, {
  defaultOptions: {
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 4,
      reset: 4,
      prev: 0,
      next: 0,
      rotateLeft: 4,
      rotateRight: 4,
      flipHorizontal: 4,
      flipVertical: 4,
    },
  },
});



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');




