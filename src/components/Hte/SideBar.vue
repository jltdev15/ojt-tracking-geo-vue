<template>
  <div
    class="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
    :class="{ '-translate-x-full': props.isSidebarHidden }"
  >
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="text-2xl font-bold text-gray-600">OJT Tracker <span>v 1.0</span></h2>
    </a>
    <ul class="mt-4">
      <span class="font-bold text-gray-400 capitalize">HTE</span>
      <li class="mb-1 group">
        <router-link
          to="/hte/dashboard"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg ri-home-2-line"></i>
          <span class="text-sm">Dashboard</span>
        </router-link>
      </li>

      <span class="font-bold text-gray-400 capitalize">Internships</span>
      <li class="mb-1 group">
        <router-link
          @click="toggleList"
          to="/hte/dashboard/internships"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
        >
          <i class="mr-3 text-lg bx bx-list-ol"></i>
          <span class="text-sm">Listings</span>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'ApplicantsList' }"
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-book-content"></i>
          <span class="text-sm">Applicant</span>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'AcceptedList' }"
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bxs-user-check"></i>
          <span class="text-sm">Accepted Interns</span>
          <span
            :class="{
              'bg-red-200 text-red-600': hteStore.getNumberOfInternForEvaluation,
              'bg-gray-50 text-gray-400': !hteStore.getNumberOfInternForEvaluation,
            }"
            class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide rounded-full"
            >{{
              hteStore.getNumberOfInternForEvaluation
                ? hteStore.getNumberOfInternForEvaluation
                : "0"
            }}</span
          >
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'Evaluation' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-list-check"></i>
          <span class="text-sm">Evaluated</span>
        </router-link>
      </li>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'InternMonitoring' }"
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-desktop"></i>
          <span class="text-sm">Intern Monitoring</span>
        </router-link>
      </li>
      <span class="font-bold text-gray-400">Coordinator</span>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'VisitRequest' }"
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-git-pull-request"></i>
          <span class="text-sm">Request</span>
          <span
            :class="{
              'bg-red-200 text-red-600': hteStore.getNumberOfVisitPendingRequest,
              'bg-gray-50 text-gray-400': !hteStore.getNumberOfVisitPendingRequest,
            }"
            class="md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide rounded-full"
            >{{
              hteStore.getNumberOfVisitPendingRequest
                ? hteStore.getNumberOfVisitPendingRequest
                : "0"
            }}</span
          >
        </router-link>
      </li>
      <span class="font-bold text-gray-400 capitalize">COMMUNICATION</span>
      <li class="mb-1 group">
        <router-link
          :to="{ name: 'hte_messenger' }"
          href=""
          class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
        >
          <i class="mr-3 text-lg bx bx-envelope"></i>
          <span class="text-sm">Messaging</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHteStore } from "@/stores/HteStore";
const hteStore = useHteStore();
const props = defineProps(["isSidebarHidden"]);
const isListShow = ref(false);
const toggleList = () => {
  isListShow.value = !isListShow.value;
};

onMounted(async () => {
  await hteStore.fetchVisitRequests();
});
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
