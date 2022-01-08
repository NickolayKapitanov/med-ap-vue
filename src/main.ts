import Vue from 'vue';
import Antd from 'ant-design-vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './assets/styles/index.less';

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
