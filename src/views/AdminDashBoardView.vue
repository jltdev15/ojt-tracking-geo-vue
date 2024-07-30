<template>
    <div>
        <SideBar :isSidebarHidden="isSidebarHidden" />
        <div class="fixed top-0 left-0 z-40 w-full h-full bg-black/50 md:hidden sidebar-overlay"
            :class="{ hidden: isSidebarHidden }"></div>
        <Main :isSidebarHidden="isSidebarHidden" @toggleSidebar="handletoggleSidebar" />
    </div>
</template>

<script setup>
import SideBar from "@/components/Admin/SideBar.vue";
import Main from "@/components/Admin/Main.vue";
import { ref } from "vue";
const isSidebarHidden = ref(false);

const handletoggleSidebar = () => {
    isSidebarHidden.value = !isSidebarHidden.value;
};

const hideSidebar = () => {
    isSidebarHidden.value = true;
};
</script>

<style>
/* Add your styles here */
</style>
