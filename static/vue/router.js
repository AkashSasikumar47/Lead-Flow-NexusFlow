import Home from "./components/home.js";
import Inquiry from "./components/Inquiry.js";    
import Login from "./components/login.js";
import Registration from "./components/registration.js";
import Users from "./components/users.js";


const routes = [
    { 
    path: "/", 
    component: Home,
    name: "Home"
    },
    { 
    path: "/inquiry", 
    component: Inquiry,
    name: "Inquiry" 
    },
    {
    path: "/login",
    component: Login,
    name: "Login"
    },
    {
    path: "/registration",
    component: Registration,
    name: "Registration"
    },
    {
    path: "/users",
    component: Users,
    name: "Users"
    },
];
const router = new VueRouter({
    routes,
  });
export default router;