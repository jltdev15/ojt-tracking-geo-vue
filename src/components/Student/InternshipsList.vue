<template>
  <section class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-200">
      <h1 class="text-3xl font-bold">Internships Job</h1>
      <div>
        <button @click="handleToggleModal" class="btn btn-block">
          <i class="bx bx-recycle"></i>Refresh
        </button>
      </div>
    </header>
    <div class="flex min-h-screen bg-gray-100">
      <div class="p-5">
        <div class="grid grid-cols-3 gap-6">
          <p v-if="internStore.internshipLists.length === 0">No listing available</p>
          <InternshipItem />
          <!-- <InternshipItem v-for="job in internStore.internshipLists" 
      :key="job._id"
      :datePosted="job.createdAt"
      :status="job.status"
      :slots="job.slots"
      :location="job.location"
      :description="job.description" 
      :title="job.title"
      :companyName="job.hte.name"
      :id="job._id"
      /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import InternshipItem from "./InternshipItem.vue";
import Modal from "@/BaseUI/Modal.vue";
import { useInternStore } from "@/stores/InternStore";
import { ref, onMounted, reactive } from "vue";
const internStore = useInternStore();
// const isConfirmationModalShow = ref(true);
onMounted(async () => {
  await internStore.fetchInternshipLists();
});
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
