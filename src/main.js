// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResouce from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import 'common/style/index.styl';
// 全局注册
Vue.use(VueRouter);
Vue.use(VueResouce);
// 定义App为根组件
Vue.extend(App);
// 路由配置
var router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]

});
// 路由启动
const app = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
console.log(app);
router.push('/goods');
