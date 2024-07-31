<template>
    <section class="p-3">
        <div>users page</div>
        <span>search field:</span>
        <select v-model="searchField">
            <option>player</option>
            <option>team</option>
        </select>

        <br />

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

const searchField = ref("player");
const searchValue = ref("Stephen Curry");

const headers = [
    { text: "NAME", value: "player" },
    { text: "DATE CREATED", value: "team" },
    { text: "ROLE", value: "number" },
    { text: "STATUS", value: "position" },
    { text: "ACTIONS", value: "operation", width: 10 },
];

const items = [
    {
        player: "Stephen Curry",
        team: "GSW",
        number: 30,
        position: "G",
        height: "6-2",
        weight: 185,
        lastAttended: "Davidson",
        country: "USA",
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
