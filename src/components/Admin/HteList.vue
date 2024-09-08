<template>
    <div>
        <div class="p-6 text-sm breadcrumbs">
            <ul>
                <li>
                    <router-link :to="{ name: 'admin_dashboard' }">Admin Dashboard</router-link>
                </li>
                <li>
                    <router-link class="font-bold" :to="{ name: 'hteLists' }">List</router-link>
                </li>
                <!-- <li>
                    <router-link class="text-red-800" :to="{ name: 'UpdateUser' }">Update user</router-link>
                </li> -->
            </ul>
        </div>
        <header class="flex items-center justify-between px-6">
            <h1 class="text-3xl font-bold">Register Host Training Establishments</h1>
        </header>
        <div class="flex justify-end gap-3 p-6">
            <input type="text" placeholder="Type here" class="w-full input input-bordered" v-model="searchValue" />
            <select class="w-48 select select-bordered" v-model.trim="searchField">
                <option selected disabled value="Set filter">Set filter</option>
                <option value="Username">Username</option>
            </select>
        </div>
        <div class="px-6">
            <EasyDataTable :headers="headers" :items="useUserStore.htesList" :search-field="searchField"
                :search-value="searchValue" table-class-name="customize-table">
                <template #item-internships="item">
                    <div>
                        <router-link :to="{ name: 'hteItem', params: { id: item._id } }">View</router-link>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAdminUserStore } from '@/stores/AdminUserStore';
const useUserStore = useAdminUserStore()
const searchField = ref("Set filter");
const searchValue = ref("");
const headers = [
    { text: "Company Name", value: "name" },
    { text: "Address", value: "address" },
    { text: "Contact", value: "contactNumber" },
    { text: "Internships", value: "internships" },

];

onMounted(async () => {
    await useUserStore.fetchHTEList()
})

</script>

<style scoped>
.customize-table {

    --easy-table-header-font-color: #fff;
    --easy-table-header-background-color: #ae1818;

}
</style>
