<template>
  <div
    class="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
    :class="{ '-translate-x-full': props.isSidebarHidden }"
  >
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
    </a>
    <ul class="flex flex-col gap-3 mt-4">
      <span class="font-bold text-gray-400 uppercase">Intern</span>
      <li class="mb-1 group">
        <router-link
          to="/student/dashboard"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg ri-home-2-line"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>
      <span class="font-bold text-gray-400 uppercase">Internships</span>
      <li class="mb-1 group">
        <router-link
          to="/student/dashboard/internships"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-windows"></i>
          <span class="text-sm">Browse Internships</span>
        </router-link>
      </li>
      <li @click="internStore.resetNotification" class="mb-1 group">
        <router-link
          :to="{ name: 'ApplicationStatus' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-stats"></i>
          <span class="text-sm">Application Status</span>
          <span v-if="internStore.getNumberOfNotification"
            class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full"
            >{{ internStore.getNumberOfNotification }}</span
          >
        </router-link>
      </li>

   
    </ul>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { ref } from "vue";
const props = defineProps(["isSidebarHidden"]);
const isListShow = ref(false);
const internStore = useInternStore();
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
