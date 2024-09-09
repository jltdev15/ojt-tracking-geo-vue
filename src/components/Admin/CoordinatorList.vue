<template>
    <div>
        <div class="p-6 text-sm breadcrumbs">
            <ul>
                <li>
                    <router-link :to="{ name: 'admin_dashboard' }">Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'CoordinatorList' }">Coordinator</router-link>
                </li>

            </ul>
        </div>
        <header class="flex items-center justify-between px-6">
            <h1 class="text-3xl font-bold">School Coordinator</h1>
        </header>
        <div class="flex justify-end gap-3 px-6 py-3">
            <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" />
            <select class="w-48 select select-bordered" v-model.trim="searchField">
                <option selected disabled value="Set filter">Set filter</option>
                <option value="department">Department</option>
                <option value="fullName">Full Name</option>
            </select>
        </div>
        <section class="px-6">
            <EasyDataTable :headers="headers" :items="userStore.coordinatorList" :search-field="searchField"
                :search-value="searchValue" table-class-name="customize-table">
                <template #item-request="item">
                    <p v-if="item.requestList.length">
                        <router-link :to="{ name: 'CoordinatorRequestItem', params: { id: item._id } }"
                            class="btn btn-outline btn-accent">
                            View requests
                        </router-link>
                    </p>
                    <p v-else>
                        No remarks
                    </p>

                </template>
            </EasyDataTable>
        </section>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
const userStore = useAdminUserStore();
const route = useRoute();
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
    { text: "Department", value: "department" },
    { text: "Name", value: "fullName" },
    { text: "Contact", value: "contact" },

    { text: "Visitation", value: "request" },
    //   { text: "STATUS", value: "status" },
    //   { text: "REMARKS", value: "remarks" },
];

onMounted(async () => {
    await userStore.fetchCoordinator()
})
</script>

<style scoped></style>