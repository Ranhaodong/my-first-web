import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ban from '@/components/common/ban'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: ban},
    {path: '*',component: HelloWorld},
  ]
})
