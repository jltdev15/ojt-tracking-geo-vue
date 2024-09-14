<template>
  <div>
    <TheHeader />

    <About />
    <Hero />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import Hero from "@/components/Home/Hero.vue";
import About from "@/components/Home/About.vue";
import TheHeader from "@/components/TheHeader.vue";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkAuth();
});
</script>

<style lang="scss" scoped></style>
