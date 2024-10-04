<template>
  <div>
    <TheHeader />

    <About />
    <Hero />
    <HTE :internships="internshipLists" />
    <Testimonials />
    <ContactForm />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import Hero from "@/components/Home/Hero.vue";
import About from "@/components/Home/About.vue";
import HTE from "@/components/Home/HTE.vue";
import Testimonials from "@/components/Home/Testimonials.vue";
import ContactForm from "@/components/Home/ContactForm.vue";
import TheHeader from "@/components/TheHeader.vue";
import Footer from "@/components/Home/Footer.vue";
import { useInternStore } from "@/stores/InternStore";
const internStore = useInternStore();
import { storeToRefs } from "pinia";
const { internshipLists } = storeToRefs(internStore);
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkAuth();
  await internStore.fetchInternshipLists();
});
</script>

<style lang="scss" scoped></style>
