<template>
  <div
    class="fixed left-0 top-0 w-64 h-full overflow-y-auto bg-[#f8f4f3] p-4 z-50 sidebar-menu block md:hidden transition-transform"
    :class="{ '-translate-x-full': props.isSidebarHidden }">
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
    </a>
    <ul class="mt-4">
      <span class="font-bold text-gray-400">ADMIN</span>
      <li @click="toggleSideLink" class="mb-1 group">
        <router-link to="/admin/dashboard"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg ri-home-2-line"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>
      <li class="mb-1 transition group">
        <span @click="isDropDownShow = !isDropDownShow"
          class="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-user"></i>
          <span class="text-sm">Users</span>
          <i class="ml-auto transition-all ri-arrow-right-s-line"
            :class="{ 'rotate-90': isDropDownShow, 'rotate-260': !isDropDownShow }"></i>
        </span>

        <ul :class="{ 'h-0 hidden': !isDropDownShow, block: isDropDownShow }" class="mt-2 transition-all pl-7">
          <li @click="toggleSideLink" class="mb-4">
            <router-link :to="{ name: 'manage_users' }" href=""
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">All</router-link>
          </li>
          <li @click="toggleSideLink" class="mb-4">
            <router-link :to="{ name: 'manage_users', query: { users: 'HTE' } }"
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">HTE</router-link>
          </li>
          <li @click="toggleSideLink" class="mb-4">
            <router-link :to="{ name: 'manage_users', query: { users: 'Intern' } }" href=""
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Intern</router-link>
          </li>
          <li @click="toggleSideLink" class="mb-4">
            <router-link :to="{ name: 'manage_users', query: { users: 'Coordinator' } }" href=""
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Coordinator</router-link>
          </li>
        </ul>
      </li>

      <span class="font-bold text-gray-400 uppercase">Coordinator</span>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'CoordinatorList' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-group"></i>
          <span class="text-sm">Manage Coordinator</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
        <router-link @click="toggleSideLink" :to="{ name: 'CoordinatorRequest' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-git-pull-request"></i>
          <span class="text-sm">View Request</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>

      <span class="font-bold text-gray-400 uppercase">Interns</span>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'InternsList' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-list-ul"></i>
          <span class="text-sm">Manage Interns</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">HTE</span>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'hteLists' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bxs-buildings"></i>
          <span class="text-sm">Manage HTE</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'Hte_Listing' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-hard-hat"></i>
          <span class="text-sm">View Internships</span>
        </router-link>
      </li>

      <span class="font-bold text-gray-400">SETTINGS</span>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'appSettings' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg bx bx-cog"></i>
          <span class="text-sm">App Settings</span>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">Communication</span>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'admin_messenger' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg bx bx-envelope"></i>
          <span class="text-sm">Messages</span>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link @click="toggleSideLink" :to="{ name: 'admin_announcement' }" href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg bx bx-list-ol"></i>
          <span class="text-sm">Announcement</span>
        </router-link>
      </li>
    </ul>
  </div>
  <!-- Large desktops -->
  <div
    class="fixed left-0 top-0 w-64 h-full overflow-y-auto bg-[#f8f4f3] p-4 z-50 sidebar-menu hidden md:block  transition-transform"
    :class="{ '-translate-x-full': props.isSidebarHidden }">
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
    </a>
    <ul class="mt-4">
      <span class="font-bold text-gray-400">ADMIN</span>
      <li class="mb-1 group">
        <router-link to="/admin/dashboard"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg ri-home-2-line"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>
      <li class="mb-1 transition group">
        <span @click="isDropDownShow = !isDropDownShow"
          class="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-user"></i>
          <span class="text-sm">Users</span>
          <i class="ml-auto transition-all ri-arrow-right-s-line"
            :class="{ 'rotate-90': isDropDownShow, 'rotate-260': !isDropDownShow }"></i>
        </span>

        <ul :class="{ 'h-0 hidden': !isDropDownShow, block: isDropDownShow }" class="mt-2 transition-all pl-7">
          <li class="mb-4">
            <router-link :to="{ name: 'manage_users' }" href="" active-class="active-link"
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">All</router-link>
          </li>
          <li class="mb-4">
            <router-link :to="{ name: 'manage_users', query: { users: 'HTE' } }" active-class="active-link"
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">HTE</router-link>
          </li>
          <li class="mb-4">
            <router-link :to="{ name: 'manage_users', query: { users: 'Intern' } }" active-class="active-link" href=""
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Intern</router-link>
          </li>
          <li class="mb-4">
            <router-link :to="{ name: 'manage_users', query: { users: 'Coordinator' } }" active-class="active-link"
              href=""
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Coordinator</router-link>
          </li>
        </ul>
      </li>

      <span class="font-bold text-gray-400 uppercase">Coordinator</span>
      <li class="mb-1 group">
        <router-link :to="{ name: 'CoordinatorList' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-group"></i>
          <span class="text-sm">Manage Coordinator</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
        <router-link :to="{ name: 'CoordinatorRequest' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-git-pull-request"></i>
          <span class="text-sm">View Request</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>

      <span class="font-bold text-gray-400 uppercase">Interns</span>
      <li class="mb-1 group">
        <router-link :to="{ name: 'InternsList' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-list-ul"></i>
          <span class="text-sm">Manage Interns</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">HTE</span>
      <li class="mb-1 group">
        <router-link :to="{ name: 'hteLists' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bxs-buildings"></i>
          <span class="text-sm">Manage HTE</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link :to="{ name: 'Hte_Listing' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
          <i class="mr-3 text-lg bx bx-hard-hat"></i>
          <span class="text-sm">View Internships</span>
        </router-link>
      </li>

      <span class="font-bold text-gray-400">SETTINGS</span>
      <li class="mb-1 group">
        <router-link :to="{ name: 'appSettings' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg bx bx-cog"></i>
          <span class="text-sm">App Settings</span>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">Communication</span>
      <li class="mb-1 group">
        <router-link :to="{ name: 'admin_messenger' }" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg bx bx-envelope"></i>
          <span class="text-sm">Messages</span>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link :to="{ name: 'admin_announcement' }" href="" active-class="active-link"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-[#ae1818] hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
          <i class="mr-3 text-lg bx bx-list-ol"></i>
          <span class="text-sm">Announcement</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["isSidebarHidden"]);
const isDropDownShow = ref(false);
const emit = defineEmits(['toggleSideBarLink'])

const toggleDropdown = () => { };

const toggleSideLink = () => {
  emit('toggleSideBarLink')
}
</script>

<style scoped>
/* Add your styles here */

@media (min-width: 768px) {
  .main.active {
    margin-left: 0px;
    width: 100%;
  }
}

.translate-x-full {
  transform: translateX(-100%);
}
</style>
