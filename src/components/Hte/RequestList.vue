<template>
    <div>
        <header class="flex items-center justify-between p-6 bg-gray-200">
            <h1 class="px-3 text-3xl">
                Visitation <span class="text-3xl font-bold">Request</span>
            </h1>
        </header>
        <div class="divider"></div>
        <div class="flex justify-end gap-3 px-6">
            <input type="text" placeholder="Search here" class="w-full input input-bordered" v-model="searchValue" />
            <select class="w-48 select select-bordered" v-model.trim="searchField">
                <option selected disabled value="Set filter">Set filter</option>
                <option value="status">Status</option>
                <option value="title">Title</option>
            </select>
        </div>
        <section class="p-6">

            <EasyDataTable :headers="headers" :items="hteStore.requestList" :search-field="searchField"
                :search-value="searchValue" table-class-name="customize-table" show-index>
                <template #item-operation="item">
                    <div v-if="item.status === 'Pending'" class="flex justify-center gap-3 py-2">
                        <button @click="handleToggleAcceptModal(item._id)" class="btn-primary btn text-gray-50">
                            Accept
                        </button>
                        <button @click="handleRejectRequest(item._id)" class=" btn btn-accent btn-outline text-gray-50">
                            Reject
                        </button>
                    </div>
                    <div v-if="item.status === 'Accepted'">
                        <p>No action needed</p>
                    </div>
                    <div v-if="item.status === 'Rejected'">
                        <button @click="handleToggleRejectModal(item._id)"
                            class=" btn btn-accent btn-outline text-gray-50">
                            Remove
                        </button>
                    </div>
                </template>
                <template #item-remarks="item">
                    <p v-if="item.remarks">
                        {{ item.remarks }}
                    </p>
                    <p v-else>
                        No remarks
                    </p>

                </template>
            </EasyDataTable>
            <Modal :show="isConfirmModalShow" title="Confirmation">
                <template #default>
                    <p class="text-xl text-center">Are you sure you want to accept this request?</p>
                    <div class="flex justify-end gap-3 py-6">
                        <button @click="isConfirmModalShow = !isConfirmModalShow"
                            class="btn btn-accent btn-outline">Cancel</button>
                        <button type="button" @click="handleAcceptRequest" class="btn btn-primary text-gray-50">
                            Confirm
                        </button>
                    </div>
                </template>
            </Modal>
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from "@/stores/AuthStore";
import { useHteStore } from "@/stores/HteStore";

const hteStore = useHteStore();
const authStore = useAuthStore();
const searchField = ref("Set filter");
const searchValue = ref("");
const isConfirmModalShow = ref(false)
const visitId = ref('')

const handleToggleAcceptModal = async (id) => {
    visitId.value = id;
    isConfirmModalShow.value = !isConfirmModalShow.value
}
const handleToggleRejectModal = async (id) => {
    visitId.value = id;
    isConfirmModalShow.value = !isConfirmModalShow.value
}
const handleRejectRequest = async (id) => {
    await hteStore.rejectVisitRequests(id)
}
const handleAcceptRequest = async () => {
    await hteStore.acceptVisitRequests(visitId.value)
    isConfirmModalShow.value = !isConfirmModalShow.value
}

const headers = [
    { text: "REQUESTOR", value: "requestorName" },

    { text: "REQUEST DATE", value: "scheduledDate" },
    { text: "REQUEST TIME", value: "scheduledtime" },
    { text: "DEPARTMENT", value: "department" },
    { text: "REMARKS", value: "remarks" },
    { text: "STATUS", value: "status" },
    { text: "ACTIONS", value: "operation" },
];

onMounted(async () => {
    await hteStore.fetchVisitRequests()
})
</script>

<style lang="scss" scoped></style>
