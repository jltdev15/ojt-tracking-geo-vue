<template>
  <div>
    <SideBar :isSidebarHidden="isSidebarHidden" />
    <div
      @click="handletoggleSidebar"
      class="fixed top-0 left-0 z-40 w-full h-full bg-black/50 md:hidden sidebar-overlay"
      :class="{ hidden: isSidebarHidden }"
    ></div>
    <MainContainer
      :isSidebarHidden="isSidebarHidden"
      @toggleSidebar="handletoggleSidebar"
    />
  </div>
</template>

<script setup>
import SideBar from "@/components/Coor/SideBar.vue";
import MainContainer from "@/components/Coor/MainContainer.vue";
import { ref } from "vue";
const isSidebarHidden = ref(false);

const handletoggleSidebar = () => {
  isSidebarHidden.value = !isSidebarHidden.value;
};
</script>

<style>
/* Add your styles here */
</style>
