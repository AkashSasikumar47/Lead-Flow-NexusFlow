const Login = Vue.component("login", {
    template:  `
    <div>

    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="/" class="logo d-flex align-items-center w-auto">
                  <img src="/static/assets/Images/Logo_1.png" alt="">
                  <span class="d-none d-lg-block">NexusFlow</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                    <p class="text-center small">Enter your username & password to login</p>
                  </div>

                  
                  <div class="alert alert-danger" v-if="error">
                  {{ error }}
                  </div>

                  <div class="row g-3 needs-validation" novalidate>

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <input type="text" name="username" class="form-control" id="yourUsername" required v-model="cred.email">
                        <div class="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <div class="input-group">
                        <input type="password" name="password" class="form-control" id="yourPassword" required v-model="cred.password">
                        <button class="btn btn-outline-secondary" type="button" id="showPasswordButton">
                          <i class="bi bi-eye-slash-fill" id="eyeIcon"></i>
                        </button>
                      </div>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div class="col-12 text-center">
                      <button @click="login" class="btn btn-primary w-50 rounded-pill" type="submit">Login</button>
                    </div>

                    </div>

                  

                </div>
              </div>

              <div class="credits">
                &copy; Copyright <a href="https://example.com/">NexusFlow</a>
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>
    
    
    </div>`,


    data() {
        return {
          cred: {
            email: null,
            password: null,
          },
          error: null,
        }
      },
      methods: {
        async login() {
          const res = await fetch('/user-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.cred),
          });
          if(res.ok){
            const data = await res.json();
            console.log(data);
            localStorage.setItem('auth-token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.username);
            this.$router.push({ path: '/' });
        }
        else{
            const data = await res.json();
            console.log(data);
            this.error = data.message;

        }
        }
    },


    mounted : function(){
        document.title = "Login";
    }
  
  });
  
  export default Login;