<template>
  <div
    class="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
    :class="{ '-translate-x-full': props.isSidebarHidden }"
  >
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
    </a>

    <ul class="mt-4">
      <span class="font-bold text-gray-400 uppercase">Coordinator</span>
      <li class="mb-1 group">
        <router-link
          to="/admin/dashboard"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg ri-home-2-line"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">Internships</span>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'InternDepartmentList' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bx-group"></i>
          <span class="text-sm">Interns</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>

      <li class="mb-1 group">
        <router-link
          to="#"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bx-list-check"></i>
          <span class="text-sm">Evaluation</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">HTE</span>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'HteList' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bx-list-ol"></i>
          <span class="text-sm">List</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'CoorRequest' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-l bx bx-buildings"></i>
          <span class="text-sm">Request</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>

      <span class="font-bold text-gray-400 uppercase">Communication</span>
      <li class="mb-1 group">
        <router-link
          to="#"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bx-message-dots"></i>
          <span class="text-sm">Messaging</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">Settings</span>
      <li class="mb-1 group">
        <router-link
          to="#"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bxs-user-account"></i>
          <span class="text-sm">Account Settings</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-180"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(["isSidebarHidden"]);
</script>

<style scoped>
/* Add your styles here */
.hidden {
  display: none;
}

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
