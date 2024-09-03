<template>
  <div class="p-6">
    <header class="">
      <h1 class="text-3xl font-bold">Interns List</h1>
    </header>
    <section class="">
      <div class="flex justify-end gap-3 py-3">
        <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="department">Department</option>
        </select>
      </div>
      <EasyDataTable :headers="headers" :items="userStore.internsList" :search-field="searchField"
        :search-value="searchValue">
        <template #item-dailytimerecord="item">
          <div class="flex justify-between gap-3 py-2">
            <router-link :to="{ name: 'DTRList', params: { id: item._id } }"
              class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50">
              View <i class="fa-solid fa-pen-to-square"></i>
            </router-link>
          </div>
        </template>
        <template #item-status="item">
          <div v-if="item.isEvaluationReady">
            <p>Finished Internship</p>
          </div>
          <div v-else>
            <p>Ongoing Internship</p>
          </div>
        </template>
      </EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, ref } from "vue";
const userStore = useAdminUserStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "NAME", value: "fullName" },

  { text: "DEPARTMENT", value: "department" },
  { text: "CONTACT", value: "contact" },
  { text: "REQUIRED HOURS", value: "requiredHours" },
  { text: "RENDERED HOURS", value: "workedHours" },
  { text: "DAILY TIME RECORD", value: "dailytimerecord" },
  { text: "EVALUATION RESULTS", value: "isEvaluationReady" },

  { text: "STATUS", value: "status" },
];

onMounted(async () => {
  await userStore.fetchInternsList();
});
</script>

<style lang="scss" scoped></style>
