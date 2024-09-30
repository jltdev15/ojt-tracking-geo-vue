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

    <div class="w-full p-3 bg-white rounded-md shadow-md">
      <header class="flex items-center justify-between pb-3 ">
        <h1 class="text-3xl font-bold">Internships Job</h1>

      </header>
      <InternshipItem :show="internStore.isProfileComplete === true && internStore.internshipLists.length != 0"/>
      <div class="flex items-center justify-center md:h-[50dvh]">
        <div class="text-lg text-center" v-if="internStore.internshipLists.length === 0">
          <i class=' bx bx-x'></i>
          <p >No listing available</p>
        </div>
        
        <div class="flex flex-col gap-3 rounded-md md:shadow-md h-96 w-96 " v-if="internStore.isProfileComplete === false && internStore.internshipLists.length">
          <p
          class="w-full p-3 text-lg font-medium text-center text-gray-900 capitalize card-header">   Complete your profile

        </p>
        <div class="px-6 pt-3 text-center">
          <i class='bx bx-edit-alt text-[4.8rem] text-center'></i>
          <p class="py-1 text-sm font-medium">Please complete your profile</p>
          <p class="py-1 text-sm text-justify text-gray-400">HTE Prefers to look at profile that are complete. A complete profile will enable you to browse internships listing available.</p>
        </div>
        <div class="py-6 mt-auto text-center">
          <router-link class="inline-block p-1 px-2 font-medium bg-green-600 rounded-md text-gray-50" :to="{ name: 'intern_profile' }"
            >Let's do it</router-link
          >
        </div>
       

        </div>


      </div>


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
import { useRouter,useRoute  } from "vue-router";
const router = useRouter()
const route = useRouter()
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
