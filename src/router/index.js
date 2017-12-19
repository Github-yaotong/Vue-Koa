import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import TodoList from '@/components/TodoList'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [
      {
        path: '/',
        component: Login
      },
      {
        path: '/todolist',
        component: TodoList
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
});

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('demo-token');
    if (to.path == '/'){
        if (token !== 'null' && token !== null){
            next('/todolist');
        }

        next();
    } else {
        if (token !== 'null' && token !== null){
            Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            next();
        } else {
            next('/');
        }
    }
})

export default router

// export default new Router({

//   routes: [
//     {
//       path: '/',
//       name: 'login',
//       component: Login
//     },
//     {
//       path: '/todolist',
//       name: 'todolist',
//       component: TodoList
//     }
//   ]
// })

// beforeEach((tp, from, next) => {
//   const token = sessionStorage.getItem('demo-token');
//   if (to.path == '/'){
//     if (token !== 'null' && token !== null){
//       next('/todolist');
//     }

//     next();
//   } else {
//     if (token !== 'null' && token !== null){
//       next();
//     } else {
//       next('/');
//     }
//   }
// })

