<template>
  <div class="w-10/12 mx-auto">
    <div class="md:py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'Hte_Listing' }">HTE Listings</router-link>
        </li>
      </ul>
    </div>
    <section class="bg-gray-50 rounded-md p-6 shadow-md">
      <header class="">
        <h1 class="text-3xl font-bold">Internships Posted</h1>
      </header>
      <section class="">
        <div class="flex justify-end gap-3 py-3">
          <input
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
            v-model="searchValue"
          />
          <select class="w-48 select select-bordered" v-model.trim="searchField">
            <option selected disabled value="Set filter">Set filter</option>
            <option value="title">Title</option>
            <option value="requirements">Requirements</option>
          </select>
        </div>
        <EasyDataTable
          :headers="headers"
          :items="userStore.vacancyList"
          :search-field="searchField"
          :search-value="searchValue"
          table-class-name="customize-table"
        >
          <template #item-dailytimerecord="item">
            <div class="flex justify-between gap-3 py-2">
              <router-link
                :to="{ name: 'DTRList', params: { id: item._id } }"
                class="btn btn-accent btn-outline text-gray-50"
              >
                View
              </router-link>
            </div>
          </template>
          <template #item-status="item">
            <div v-if="item.isInternshipReady">
              <p>Ongoing Internship</p>
            </div>
            <div v-else>
              <p>On going application</p>
            </div>
          </template>
          <template #item-evaluation="item">
            <div v-if="item.isEvaluationReady">
              <router-link>View evaluation</router-link>
            </div>
            <div v-else>
              <p>No evaluation found</p>
            </div>
          </template>
        </EasyDataTable>
      </section>
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
  { text: "Title", value: "title" },
  { text: "Requirements", value: "requirements" },
  { text: "Slots", value: "slots" },
  { text: "Location", value: "location" },
];

onMounted(async () => {
  await userStore.fetchInternsList();
  await userStore.fetchHTEListing();
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
