<template>
  <div class="p-3">
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'student_dashboard' }">Intern Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ApplicationStatus' }">Status</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6 pb-6">
      <h1 class="text-3xl font-bold">Application Status</h1>
      <div>
        <p class="text-sm font-medium">Number of Applications</p>
        <span>{{ internStore.getNumberOfApplication }}</span>
      </div>
    </header>
    <section class="px-6">
      <ApplicationStatusItem :appInfoArr="applicationLists" />
    </section>
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
