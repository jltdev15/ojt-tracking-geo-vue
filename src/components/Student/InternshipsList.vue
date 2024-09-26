<template>
  <section class="p-3 py-3 mx-auto md:w-10/12 xl:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'student_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'internships_list' }">Internship Jobs</router-link>
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between pb-3 bg-gray-200">
      <h1 class="text-3xl font-bold">Internships Job</h1>
      <div>
        <button @click="handleToggleModal" class="btn btn-block">
          <i class="bx bx-recycle"></i>Refresh
        </button>
      </div>
    </header>
    <div class="">
      <InternshipItem :show="internStore.isProfileComplete === true && internStore.internshipLists.length != 0"/>
      <p v-if="internStore.internshipLists.length === 0">No listing available</p>
      <p
        class="w-full p-3 bg-primary text-gray-50"
        v-if="!internStore.isProfileComplete && internStore.internshipLists.length"
      >
        Please complete your profile information.
        <router-link class="underline" :to="{ name: 'intern_profile' }"
          >Click here</router-link
        >
      </p>

      <!-- <div class="flex">
          
          <p
            class="inline-block p-3 capitalize bg-primary text-gray-50"
            v-if="
              internStore.requiredHours === 0 && internStore.internshipLists.length > 0
            "
          >
            Please ask your coordinator to set required hours
          </p>
          <p
            class="p-3 bg-primary text-gray-50"
            v-else-if="
              !internStore.isProfileComplete && internStore.internshipLists.length
            "
          >
            Please complete your profile information.
            <router-link class="underline" :to="{ name: 'intern_profile' }"
              >Click here</router-link
            >
          </p>
          <div v-else>
         
          </div>
        </div> -->
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
