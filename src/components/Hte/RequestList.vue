<template>
    <div>
        <div class="p-6 text-sm breadcrumbs">
            <ul>
                <li>
                    <router-link :to="{ name: 'hte_dashboard' }">HTE Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'VisitRequest' }">Request</router-link>
                </li>
            </ul>
        </div>
        <header class="flex items-center justify-between pb-6">
            <h1 class="px-6 text-3xl">
                Visitation <span class="text-3xl font-bold">Request</span>
            </h1>
        </header>

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
                        <button @click="handleToggleRejectModal(item._id)"
                            class=" btn btn-accent btn-outline text-gray-50">
                            Reject
                        </button>
                    </div>
                    <div v-if="item.status === 'Accepted'">
                        <p>No action needed</p>
                    </div>
                    <div v-if="item.status === 'Rejected'">
                        <p>No action needed</p>
                    </div>
                    <div v-if="item.status === 'Done'">
                        <p>No action needed</p>
                    </div>
                    <!-- <div v-if="item.status === 'Rejected'">
                        <button @click="handleToggleRemove(item._id)" class=" btn btn-accent btn-outline text-gray-50">
                            Remove
                        </button>
                    </div> -->
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
            <!-- Accept -->
            <Modal :show="isConfirmModalShow" title="Confirmation">
                <template #default>

                    <p class="text-xl text-center ">Are you sure you want to accept this request?</p>
                    <div class="flex justify-end gap-3 py-6">
                        <button @click="isConfirmModalShow = !isConfirmModalShow"
                            class="btn btn-accent btn-outline">Cancel</button>
                        <button type="button" @click="handleAcceptRequest" class="btn btn-primary text-gray-50">
                            Confirm
                        </button>
                    </div>
                </template>
            </Modal>
            <!-- Reject -->
            <Modal :show="isRejectModalShow" title="Reject Confirmation">
                <template #default>

                    <p class="text-xl text-center ">Are you sure you want to reject this request?</p>
                    <div class="px-6 pt-6">
                        <textarea v-model.trim="hteRemarks" class="w-full px-3 textarea textarea-bordered"
                            placeholder="Put reason for rejection"></textarea>
                    </div>

                    <div class="flex justify-end gap-3 py-6">

                        <button @click="isConfirmModalShow = !isConfirmModalShow"
                            class="btn btn-accent btn-outline">Cancel</button>
                        <button type="button" @click="handleRejectRequest" class="btn btn-primary text-gray-50">
                            Confirm
                        </button>
                    </div>
                </template>
            </Modal>
            <!-- Remove Optional to implement -->
            <Modal :show="isRemoveModalShow" title="Remove Confirmation">
                <template #default>
                    <p class="text-xl text-center ">Are you sure you want to remove
                        this request</p>
                    <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>
                    <div class="flex justify-end gap-3 py-6">
                        <button @click="isRemoveModalShow = !isRemoveModalShow"
                            class="btn btn-accent btn-outline">Cancel</button>
                        <button type="button" @click="handleRemoveRequest" class="btn btn-primary text-gray-50">
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
const isRejectModalShow = ref(false)
const isRemoveModalShow = ref(false)
const visitId = ref('')
const hteRemarks = ref('')

const handleToggleRemove = async (id) => {
    visitId.value = id;
    isRemoveModalShow.value = !isRemoveModalShow.value
}
const handleRemoveRequest = async () => {

}

const handleToggleAcceptModal = async (id) => {
    visitId.value = id;
    isConfirmModalShow.value = !isConfirmModalShow.value
}
const handleToggleRejectModal = async (id) => {
    visitId.value = id;
    isRejectModalShow.value = !isRejectModalShow.value
}
const handleRejectRequest = async () => {
    if (hteRemarks.value === "") return alert('Remarks cant be empty')
    await hteStore.rejectVisitRequests(visitId.value, hteRemarks.value)
    isRejectModalShow.value = !isRejectModalShow.value
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

<style scoped>
.customize-table {
    --easy-table-border: 1px rounded #445269;
    --easy-table-header-font-size: 12px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #fff;
    --easy-table-header-background-color: #ae1818;
    --easy-table-body-row-font-size: 16px;

    --easy-table-body-row-height: 100px;
    --easy-table-body-row-font-size: 16px;
}
</style>
