<template>
  <main
    class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main"
    :class="{ active: props.isSidebarHidden }"
  >
    <!-- navbar -->
    <div
      class="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30"
    >
      <button type="button" class="text-lg font-semibold text-gray-900 sidebar-toggle">
        <i class="ri-menu-line" @click="handleToggleSidebar"></i>
      </button>

      <ul class="flex items-center ml-auto">
        <li class="ml-3 dropdown">
          <button type="button" class="flex items-center dropdown-toggle">
            <div class="relative flex-shrink-0 w-10 h-10">
              <div class="p-1 bg-white rounded-full focus:outline-none focus:ring">
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                  alt=""
                />
                <div
                  class="absolute top-0 w-3 h-3 border-2 border-white rounded-full left-7 bg-lime-400 animate-ping"
                ></div>
                <div
                  class="absolute top-0 w-3 h-3 border-2 border-white rounded-full left-7 bg-lime-500"
                ></div>
              </div>
            </div>
            <div class="p-2 text-left md:block">
              <h2 class="text-sm font-semibold text-gray-800">HTE</h2>
              <p class="text-xs text-gray-500">HTE Account</p>
            </div>
          </button>
        </li>
      </ul>
    </div>
    <router-view />
  </main>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["isSidebarHidden"]);
const emit = defineEmits(["toggleSidebar"]);

const handleToggleSidebar = () => {
  emit("toggleSidebar");
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
