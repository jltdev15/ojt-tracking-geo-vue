<template>
  <div class="p-3 py-3 mx-auto md:w-10/12 xl:w-11/12">
    <div class="text-sm md:py-6 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'student_dashboard' }">Intern Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ApplicationStatus' }">Status</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md bg-gray-50">
      <header
      class="flex flex-col pb-6 md:flex-row md:items-center md:justify-between "
    >
      <h1 class="text-xl font-bold md:text-3xl">Application Status</h1>
      <div>
        <p class="text-sm font-medium">Number of Applications</p>
        <span>{{ internStore.getNumberOfApplication }}</span>
      </div>
    </header>
    <section class="">
      <ApplicationStatusItem :appInfoArr="applicationLists" />
    </section>
    </div>
    
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { useRouter } from "vue-router";
import ApplicationStatusItem from "./ApplicationStatusItem.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const internStore = useInternStore();

const { applicationLists } = storeToRefs(internStore);

onMounted(async () => {
  await internStore.fetchApplicationList();
});
</script>

<style lang="scss" scoped></style>
