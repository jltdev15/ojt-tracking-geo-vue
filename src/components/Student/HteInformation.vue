<template>
    <div>
        <div class="p-6 text-sm breadcrumbs">
            <ul>
                <li>
                    <router-link :to="{ name: 'student_dashboard' }">Dashboard</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'internships_list' }">Internship Jobs</router-link>
                </li>
                <li>
                    <p>HTE Information</p>
                </li>
            </ul>
        </div>
        <div class="mx-6 shadow-xl bg-base-100 w-96">
            <header class="p-3 ">
                <h1 class="text-xl font-bold">{{ internStore.hteInformation.name }}</h1>
                <p class="text-xs">Contact Number : {{ internStore.hteInformation.contactNumber }}</p>
                <p class="text-xs">Address{{ internStore.hteInformation.address }}</p>
            </header>
            <div>

            </div>

        </div>



    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useInternStore } from "@/stores/InternStore";
const internStore = useInternStore()
const route = useRoute();

onMounted(async () => {
    await internStore.getHteInformation(route.params.id);
    console.log('====================================');
    console.log(internStore.hteInformation._id);
    console.log('====================================');
});
</script>

<style lang="scss" scoped></style>
