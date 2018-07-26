import Vue from 'vue'
import Router from 'vue-router'
import lazyLoad from '../util/lazyLoading';

Vue.use(Router)

const login = lazyLoad('login/login');
const index = lazyLoad('index/index');
const home = lazyLoad('home/home');
const member = lazyLoad('member/member');
const memberEdit = lazyLoad('member/memberEdit');
const register = lazyLoad('register/register');
const profile = lazyLoad('profile/profile');
const recharge = lazyLoad('recharge/recharge');
const rule = lazyLoad('rule/rule');
const translate = lazyLoad('translate/translate');
const history = lazyLoad('translate/history');
const ruleEdit = lazyLoad('rule/ruleEdit');

export default new Router({
    trict: process.env.NODE_ENV !== 'production',
    mode: 'history',
    // linkActiveClass: 'is-active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
          path: '/index',
          name: 'index',
          redirect: 'home',
          component: index,
          children:[
            {
              path: '/member',
              name: 'member',
              component: member,
              children:[
                {
                  path: '/memberEdit',
                  name: 'memberEdit',
                  component: memberEdit
                }
              ]
            },
            {
              path: '/profile',
              name: 'profile',
              component: profile
            },
            {
              path: '/recharge',
              name: 'recharge',
              component: recharge
            },
            {
              path: '/rule',
              name: 'rule',
              component: rule,
              children: [
                {
                  path: '/ruleEdit',
                  name: '/ruleEdit',
                  component: ruleEdit
                },
              ]
            },
            {
              path: '/translate',
              name: 'translate',
              component: translate
            },
            {
              path: '/history',
              name: 'history',
              component: history
            },
            {
              path: '/home',
              name: 'home',
              component: home
            },
          ]
        },
        {
          path: '/register',
          name: 'register',
          component: register
        }
    ]
})

