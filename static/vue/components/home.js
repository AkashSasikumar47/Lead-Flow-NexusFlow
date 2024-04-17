import Managerhome from "./managerhome.js";
import Adminhome from "./adminhome.js";

const Home =Vue.component('home', {
    template: `<div>
                <div v-if="userRole == 'Admin'">
                    <Adminhome></Adminhome>
                </div>
                <div v-if ="userRole == 'Manager'" >
                    <Managerhome></Managerhome>
                </div>
            </div>`,
                data() {
                    return {
                        userRole: localStorage.getItem('role'),
                    }

                },
                components: {
                    Managerhome,
                    Adminhome,
                },
                mounted : function(){
                    document.title = "Home";
    }
});



export default Home;