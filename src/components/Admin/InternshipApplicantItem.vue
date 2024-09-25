<template>
  <div>
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
        :items="hteStore.applicantItemList"
        :search-field="searchField"
        :search-value="searchValue"
        table-class-name="customize-table"
        :rows-per-page="5"
        :hide-rows-per-page="true"
      >
      </EasyDataTable>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useHteStore } from "@/stores/HteStore";
import { useRoute } from "vue-router";

const route = useRoute();
const hteStore = useHteStore();

const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
  { text: "Intern Name", value: "firstName" },
  { text: "Department", value: "department" },
  { text: "Internship applied", value: "jobTitle" },
];

onMounted(async () => {
  await hteStore.fetchSingleInternships(route.params.id);
  console.log("====================================");
  console.log(hteStore.applicantItemList);
  console.log("====================================");
});
</script>

<style lang="scss" scoped></style>
