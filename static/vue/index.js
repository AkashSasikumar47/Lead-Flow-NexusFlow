
import router from "./router.js";
import Sidebar from "./components/sidebar.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Registration' && !localStorage.getItem('auth-token') ? true : false)
    next({ name: 'Login' })
  else next()
})


new Vue({
  el: '#app',
  template: `<div>
    
    <Header :key='has_changed' />
    <Sidebar :key='has_changed'/>
    <router-view />
    <Footer />
    
    
    
    </div>`,
  router,
  components: {
    Sidebar,
    Header,
    Footer,
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

