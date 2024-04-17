const Users = Vue.component("users", {
    template: `
      <div 
      <main id="main" class="main">

    <div class="pagetitle">
        <h1>Users</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item">Users</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
      <div class="alert alert-danger" v-if="error">
      {{ error }}
      </div>
      <h5 class="card-title">List of Users</h5>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button v-if="!user.active && user.username !== 'admin'" class="btn btn-primary" @click="approve(user.id)">
                  Approve
                </button>
                <button v-if="user.active && user.username !== 'admin'" class="btn btn-danger" @click="disapprove(user.id)">
                  Disapprove
                </button>
                <button v-if="user.username === 'admin'" class="btn btn-warning" disabled>
                  Superuser
                </button>
              </td>
              <td>
                <button v-if="user.active" class="btn btn-primary" disabled>
                  Approved
                </button>
                <button v-if="!user.active" class="btn btn-danger" disabled>
                  Not Approved
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        </div>
        </div>
    </div>
</div>
</section>

</main>
      </div>
    `,
    data() {
      return {
        allUsers: [],
        token: localStorage.getItem('auth-token'),
        error: null,
      };
    },
    methods: {
      async getallUsers() {
        const res = await fetch('/users', {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
          },
        });
        const data = await res.json().catch((e) => {});
        if (res.ok) {
          console.log(data);
          this.allUsers = data;
        } else {
          this.error = res.statusText;
        }
      },
      async approve(userId) {
        const res = await fetch(`/activate/manager/${userId}`, {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.getallUsers();
        }
      },
      async disapprove(userId) {
        const res = await fetch(`/deactivate/manager/${userId}`, {
          headers: {
            'Authentication-Token': this.token,
            'Authentication-Role': 'Admin',
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          this.getallUsers();
        }
      },
    },
    async mounted() {
      document.title = "Users";
      this.getallUsers();
    },
  });
  
  export default Users;
  