<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <div>
        <h1 class="text-3xl font-bold">{{ jobName }}</h1>
        <p class="text-xs">Posted on {{datePosted}}</p>
      </div>
      <div>
        <h1 class="text-base font-bold">Number of Applicants</h1>
        <p>{{getNumberOfApplicants}}</p>
      </div>
    </header>
    <section class="p-3">
      <p class="font-bold text-gray-600">List of Applicants</p>
      <div class="flex justify-end gap-3 py-3">
        <input
          type="text"
          placeholder="Search here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="status">Status</option>
          <option value="title">Title</option>
        </select>
      </div>
      <EasyDataTable
      :headers="headers"
      :items="applicantList"
      :search-field="searchField"
      :search-value="searchValue"
      show-index
    >
    <template #item-viewRequirements="item">
      <div class="flex justify-between gap-3 py-2">
        <p class="text-blue-600 underline cursor-pointer" @click="handleSetInternId(item._id)">Check Requirements</p>
      </div>
    </template>
    <template #item-operation="item">
      <div class="flex justify-between gap-3 py-2">
        <button
          @click="adminAuthStore.showUpdateModal(item)"
          class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50"
        >
          Edit <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          @click="handleDeleteModalToggle(item._id)"
          class="flex items-center justify-center w-24 gap-2 py-3 bg-red-500 text-gray-50"
        >
          Remove<i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </template>
    </EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useHteStore } from '@/stores/HteStore';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
const hteStore = useHteStore()
const {jobName, datePosted,applicantList,getNumberOfApplicants, applicantId } = storeToRefs(hteStore)
const route = useRoute()
const internId = ref('')
console.log(route.params.jobId);
const searchField = ref("Set filter");
const searchValue = ref("");




const headers = [
  { text: "APPLICANT NAME", value: "fullName" },
  { text: "DEPARTMENT", value: "department" },
  { text: "APPLIED DATE", value: "createdAt", width: 200 },
  { text: "VIEW REQUIREMENTS", value: "viewRequirements", width: 200 },
  { text: "ACTIONS", value: "operation", width: 200 },
];

onMounted(async () => {
  await hteStore.fetchSingleInternships(route.params.jobId)
})
const handleSetInternId = (id) => {
  applicantId.value = id;
  console.log(applicantId.value);
  
}

</script>

<style lang="scss" scoped></style>
