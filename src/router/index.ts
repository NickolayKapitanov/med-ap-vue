import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import MainPage from '../views/MainPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/programm/:id',
    name: 'ProgrammDesc',
    props: true,
    component: () => import(/* webpackChunkName: "Programm" */ '../views/ProgrammDesc.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    props: true,
    component: () => import(/* webpackChunkName: "Cart" */ '../views/Cart.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
