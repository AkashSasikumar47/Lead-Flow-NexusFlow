const Sidebar = Vue.component("sidebar", {
    template: `
    <div>

    <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
            <a v-if="['Manager'].includes(role)" class="nav-link " >
                <i class="bi bi-grid"></i>
                <router-link to="/">Dashboard</router-link>
            </a>
        </li>

        <li class="nav-item">
            <a v-if="['Admin'].includes(role)" class="nav-link " >
                <i class="bi bi-grid"></i>
                <router-link to="/users">Users</router-link>
            </a>
        </li>

        <li class="nav-item">
            <a v-if="['Manager'].includes(role)"  class="nav-link collapsed" data-bs-target="#management-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-journal-text"></i><span>Management</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="management-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                <li>
                    
                        
                 <router-link v-if="['Manager'].includes(role)" to="/inquiry"><i class="bi bi-circle"></i>Inquiries</router-link>
                    
                </li>
                <li>
                <router-link v-if="['Manager'].includes(role)" to="/proposals"><i class="bi bi-circle"></i>Proposals</router-link>
                </li>
                <li>

                <router-link v-if="['Manager'].includes(role)" to="/events"><i class="bi bi-circle"></i>Events</router-link>
                </li>
            </ul>
        </li>

        <li class="nav-item">
            <a v-if="['Manager'].includes(role)" class="nav-link collapsed" data-bs-target="#operations-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-people"></i><span>Operations</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="operations-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                <li>
                <router-link v-if="['Manager'].includes(role)" to="/menu_management"><i class="bi bi-circle"></i>Menu Management</router-link>
                </li>
                <li>
                <router-link v-if="['Manager'].includes(role)" to="/payment_invoice"><i class="bi bi-circle"></i>Payments & Invoicing</router-link>
                </li>
            </ul>
        </li>

        <li class="nav-item">
            <a v-if="['Manager'].includes(role)" class="nav-link collapsed" data-bs-target="#settings-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-gear"></i><span>Settings</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="settings-nav" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                <li>
                    <router-link v-if="['Manager'].includes(role)" to="/general_settings"><i class="bi bi-circle"></i>General Settings</router-link>
                </li>
                <li>
                    <router-link v-if="['Manager'].includes(role)" to="/user_management"><i class="bi bi-circle"></i>User Management</router-link>
                </li>
            </ul>
        </li><!-- End Settings Nav -->

        <li class="nav-item">
            <router-link to="/pages-contact" class="nav-link collapsed">
                <i class="bi bi-question-circle"></i>
                <span>Help?</span>
            </router-link>
        </li><!-- End Help Nav -->

    </ul>

</aside>
    
    </div>`,

    data() {
        return {
            role: localStorage.getItem('role'),
        }
    },




});

export default Sidebar;