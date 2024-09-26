<template>
  <div class="w-11/12 mx-auto">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Admin Dashboard</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'hteLists' }">List</router-link>
        </li>
        <li>
          <router-link class="" :to="{ name: 'hteItem' }"
            >Internships</router-link
          >
        </li>
      </ul>
    </div>
    <section class="p-6 rounded-md shadow-md bg-gray-50">
      <header class="flex items-center justify-between pb-3">
        <h1 class="text-3xl font-bold">Internships</h1>
      </header>
      <div class="flex justify-end gap-3 pb-3">
        <input
          type="text"
          placeholder="Type here"
          class="w-full input input-bordered"
          v-model="searchValue"
        />
        <select class="w-48 select select-bordered" v-model.trim="searchField">
          <option selected disabled value="Set filter">Set filter</option>
          <option value="Username">Username</option>
        </select>
      </div>
      <section class="">
        <EasyDataTable
          :headers="headers"
          :items="useUserStore.hteInternshipList"
          :search-field="searchField"
          :search-value="searchValue"
          table-class-name="customize-table"
        >
        <template #item-status="item">
          <p class="inline-block px-3 py-2 bg-green-600 rounded-md text-gray-50">{{ item.status }}</p>
        </template>
          <template #item-applicants="item">
            <div v-if="item.applicants.length > 0">
              <router-link
                :to="{ name: 'InternshipApplicantList', params: { id: item._id } }"
              >
                <p>{{ item.applicants.length }}</p>
              </router-link>
            </div>
            <p v-else>
              {{ item.applicants.length }}
            </p>
          </template>
        </EasyDataTable>
      </section>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAdminUserStore } from "@/stores/AdminUserStore";
const route = useRoute();
const useUserStore = useAdminUserStore();
const searchField = ref("Set filter");
const searchValue = ref("");

const headers = [
  { text: "Job Title", value: "title" },
  { text: "Requirements", value: "requirements" },
  { text: "Slots", value: "slots" },
  { text: "Status", value: "status" },
  { text: "Number of Applicants", value: "applicants", width:150 },
];

onMounted(async () => {
  await useUserStore.fetchHTEInternship(route.params.id);
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
@media only screen and (max-width: 390px) {
  .customize-table {
    --easy-table-header-item-padding: 10px 25px;
  }
}
</style>
