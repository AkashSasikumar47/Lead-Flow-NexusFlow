
import router from "./router.js";
import Sidebar from "./components/sidebar.js";
import header1 from "./components/header.js";
import footer1 from "./components/footer.js";

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Registration'  &&  !localStorage.getItem('auth-token') ? true : false)
      next({ name: 'Login' })
    else next()
  })
  

new Vue({
    el: '#app',
    template: `<div>
    
    <header1 :key='has_changed' />
    <Sidebar :key='has_changed'/>
    <router-view />
    <footer1 />
    
    
    
    </div>`,
    router,
    components: {
        Sidebar,
        header1,
        footer1,
    },
    data: {
        has_changed: true,
      },
      watch: {
        $route(to, from) {
          this.has_changed = !this.has_changed
        },
      },
  })
  
