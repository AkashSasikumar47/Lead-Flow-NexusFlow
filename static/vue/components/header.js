const Header = Vue.component("Header", {
    template: `
    <div>

    <header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
        <a href="/" class="logo d-flex align-items-center">
            <img src="static/assets/Images/Logo/ER-ONE Favicon.svg" alt="ER-ONE">
            <span class="d-none d-lg-block">ER-ONE</span>
        </a> <i class="bi bi-list toggle-sidebar-btn" @click="toggleSidebar"></i>
    </div><!-- End Logo -->

    <nav v-if="['Admin', 'Manager'].includes(role)" class="header-nav ms-auto">
        <ul class="d-flex align-items-center">

            <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src="static/assets/Images/profile-img.JPG" alt="Profile" class="rounded-circle">
                    <span class="d-none d-md-block dropdown-toggle ps-2">{{username}}</span>
                </a><!-- End Profile Iamge Icon -->

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                        <h6>{{username}}</h6>
                        <span>{{role}}</span>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <i class="bi bi-person"></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="#">
                            <i class="bi bi-gear"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="#" onclick="openWhatsAppChat()">
                            <i class="bi bi-question-circle"></i>
                            <span>Need Help?</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" type="button" @click="logout"   >
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Sign Out</span>
                        </a>
                    </li>

                </ul><!-- End Profile Dropdown Items -->
            </li><!-- End Profile Nav -->

        </ul>
    </nav>

</header>
    
    
    </div>`,

    data() {
        return {
            is_login: localStorage.getItem('auth-token') ? true : false,
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role'),
            inactivityTimeout: 30 * 60 * 1000, // 5 minutes in milliseconds
            inactivityTimer: null,

        }
    },

    methods: {

        toggleSidebar() {

            document.body.classList.toggle('toggle-sidebar');
        },

        logout() {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('role');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            this.$router.push({ path: '/login' });
        },
        handleUserActivity() {
            // Update the last activity timestamp
            localStorage.setItem('lastActivityTimestamp', Date.now().toString());
        },
        checkInactivity() {
            const lastActivityTimestamp = localStorage.getItem('lastActivityTimestamp');
            const currentTime = Date.now();

            if (lastActivityTimestamp && currentTime - lastActivityTimestamp > this.inactivityTimeout) {
                // User has been inactive for too long, clear local storage
                this.clearLocalStorage();
            }
        },
        clearLocalStorage() {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('role');
            this.$router.push({ path: '/login' });
        },
        startInactivityTimer() {
            this.inactivityTimer = setInterval(() => {
                this.checkInactivity();
            }, 60000); // Check every minute (adjust as needed)
        },
        stopInactivityTimer() {
            clearInterval(this.inactivityTimer);
        },
    },
    mounted() {
        // Set up event listeners to track user activity
        document.addEventListener('mousemove', this.handleUserActivity);
        document.addEventListener('keydown', this.handleUserActivity);
        document.title = "Navbar";

        // Start the inactivity timer
        this.startInactivityTimer();
    },
    beforeDestroy() {
        // Clean up event listeners and the inactivity timer
        document.removeEventListener('mousemove', this.handleUserActivity);
        document.removeEventListener('keydown', this.handleUserActivity);
        this.stopInactivityTimer();
    },




});

export default Header;