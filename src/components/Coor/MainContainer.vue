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
          <button
            @click="handleToggleDropDown"
            type="button"
            class="flex items-center dropdown-toggle"
          >
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
              <h2 class="text-sm font-semibold text-gray-800">
                {{ authStore.currentUser }}
              </h2>
              <p class="text-xs text-gray-500">Coordinator</p>
            </div>
          </button>
        </li>
      </ul>
      <ul
        :class="{ hidden: !isDropDownShow }"
        class="dropdown-menu shadow-md shadow-black/5 z-30 py-3 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
        data-popper-id="popper-1"
        style="
          position: absolute;
          inset: 0px 0px auto auto;
          margin: 0px;
          transform: translate(-24px, 68px);
          top: 5px;
        "
        data-popper-placement="bottom-end"
      >
        <li>
          <router-link
            @click="handleToggleDropDown"
            :to="{ name: 'coor_profile' }"
            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
            >Profile</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'CoorSettings' }"
            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
            >Settings</router-link
          >
        </li>
        <li>
          <a
            href="javascript:void(0)"
            @click="handleLogout"
            class="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
          >
            Logout</a
          >
        </li>
      </ul>
    </div>
    <router-view />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
import { useInternStore } from "@/stores/InternStore";
const internStore = useInternStore();
const props = defineProps(["isSidebarHidden"]);
const emit = defineEmits(["toggleSidebar"]);
const authStore = useAuthStore();
const router = useRouter();
const isDropDownShow = ref(false);
const handleToggleSidebar = () => {
  emit("toggleSidebar");
};
const handleToggleDropDown = () => {
  isDropDownShow.value = !isDropDownShow.value;
};
const handleLogout = async () => {
  await authStore.submitLogout();
  await router.push("/");
};

let intervalid = null;

onMounted(async () => {
  console.log("====================================");
  console.log(authStore.currentUser);
  console.log("====================================");
});

onUnmounted(async () => {
  if (intervalid) {
    clearInterval(intervalid);
  }
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
