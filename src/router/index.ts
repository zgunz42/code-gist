import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Component from 'vue-class-component';
import Home from '../views/Home.vue';
import PageLayout from '../layouts/PageLayout.vue';

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: PageLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: 'gallery',
        name: 'Gallery',
        // route level code-splitting
        // this generates a separate chunk (Gallery.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "Gallery" */ '../views/Gallery.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
