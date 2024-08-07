<template>
  <div
    class="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
    :class="{ '-translate-x-full': props.isSidebarHidden }"
  >
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
    </a>
    <ul class="mt-4">
      <span class="font-bold text-gray-400">HTE</span>
      <li class="mb-1 group">
        <router-link
          to="/hte/dashboard"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg ri-home-2-line"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>

      <span class="font-bold text-gray-400 uppercase">Internships</span>
      <li class="mb-1 group">
        <router-link
          @click="toggleList"
          to="/hte/dashboard/internships"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bx-list-ol"></i>
          <span class="text-sm">Listings</span>
          <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
        </router-link>
        <!-- <ul class="pl-7 mt-2 group-[.selected]:block" :class="{ hidden: !isListShow }">
          <li class="mb-4">
            <router-link
              to="/"
              class="text-gray-900 text-sm flex items-center hover:text-blue-600 hover:font-medium before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              >Active</router-link
            >
          </li>
          <li class="mb-4">
            <router-link
              to="/"
              class="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3"
              >Inactive</router-link
            >
          </li>
        </ul> -->
      </li>
      <li class="mb-1 group">
        <a
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-group"></i>
          <span class="text-sm">Applicants</span>
        </a>
      </li>
      <li class="mb-1 group">
        <a
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-list-check"></i>
          <span class="text-sm">Evaluation</span>
        </a>
      </li>
      <li class="mb-1 group">
        <a
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-git-pull-request"></i>
          <span class="text-sm">Visitation Request</span>
          <span
            class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full"
            >5</span
          >
        </a>
      </li>
      <li class="mb-1 group">
        <a
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-desktop"></i>
          <span class="text-sm">Intern Monitoring</span>
        </a>
      </li>
      <span class="font-bold text-gray-400">COMMUNICATION</span>
      <li class="mb-1 group">
        <a
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-envelope"></i>
          <span class="text-sm">Messaging</span>
        </a>
      </li>
      <span class="font-bold text-gray-400">SETTINGS</span>
      <li class="mb-1 group">
        <a
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-bell"></i>
          <span class="text-sm">Profile</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["isSidebarHidden"]);
const isListShow = ref(false);
const toggleList = () => {
  isListShow.value = !isListShow.value;
};
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
