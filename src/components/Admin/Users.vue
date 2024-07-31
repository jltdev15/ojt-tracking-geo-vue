<template>
    <section class="p-3">
        <header class="bg-gray-200 p-3 flex justify-between items-center">
            <h1 class="text-3xl">User <span class="text-3xl font-bold">Management</span></h1>
            <div>
                <button class="btn btn-block"><i class="ri-add-line"></i>Add New User</button>
            </div>
        </header>
        <span>search field:</span>

        <select class="select select-bordered w-full max-w-xs" v-model="searchField">
            <option disabled selected>Search User Filter?</option>
            <option value="role">Role</option>
            <option value="name">Name</option>
        </select>

        <span>search value: </span>
        <input type="text" v-model="searchValue" />

        <EasyDataTable :headers="headers" :items="items" :search-field="searchField" :search-value="searchValue"
            show-index>
            <template #item-operation="item">
                <div class="flex justify-between gap-3 p-3">
                    <button @click="adminAuthStore.showUpdateModal(item)"
                        class="flex items-center justify-center w-24 gap-2 py-3 bg-blue-800 text-gray-50">
                        Edit <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button @click="adminAuthStore.showDeleteModal(item)"
                        class="flex items-center justify-center w-24 gap-2 py-3 bg-red-500 text-gray-50">
                        Remove<i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </template>
        </EasyDataTable>
    </section>
</template>

<script setup>
import { ref } from "vue";

const searchField = ref("");
const searchValue = ref("");

const headers = [
    { text: "NAME", value: "name" },
    { text: "DATE CREATED", value: "date" },
    { text: "ROLE", value: "role" },
    { text: "STATUS", value: "status" },
    { text: "ACTIONS", value: "operation", width: 10 },
];

const items = [
    {
        name: "Juan Dela Cruz",
        date: "Jul 24, 2024",
        role: "admin",
        status: "active",
    },
    {
        name: "Mark Dela Cruz",
        date: "Jul 22, 2024",
        role: "HTE",
        status: "active",
    },
    {
        name: "Rodrigo Duterte",
        date: "Jul 24, 2024",
        role: "Intern",
        status: "active",
    },
];
</script>

<style scoped>
.customize-table {
    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 60px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: rgb(30 64 175);
    --easy-table-body-row-font-size: 16px;

    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 16px;
}
</style>
