<template>
    <div class="p-3 mx-auto md:py-3 md:w-10/12 xl:w-9/12">
        <div class="py-6 text-sm breadcrumbs">
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
        <section class="">
            <div class="w-full rounded-md shadow-xl bg-base-100">
                <header class="p-3 bg-primary ">
                    <h1 class="text-3xl font-bold text-gray-50">{{ internStore.hteInformation.fullName }}</h1>

                </header>

                <div class="grid p-3 md:grid-cols-2">
                    <div class="p-2 md:p-6">
                        <p class="text-lg font-semibold text-gray-400">Details</p>
                        <div class="pb-3 text-xl">
                            <p>Contact Number : {{ internStore.hteInformation.contactNumber }}</p>
                            <p>Address : {{ internStore.hteInformation.street }} {{
                                internStore.hteInformation.brgy }} {{ internStore.hteInformation.municipality }} {{
                                    internStore.hteInformation.province }}</p>
                            <p>LandMark : {{ internStore.hteInformation.landMark }}</p>
                        </div>
                    </div>
                    <div class="w-full h-[250px]" id="map"></div>


                </div>

            </div>

        </section>




    </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useInternStore } from "@/stores/InternStore";
const internStore = useInternStore()
const route = useRoute();
const map = ref(null);
const marker = ref(null)
const loader = new Loader({
    apiKey: import.meta.env.VITE_API_GOOGLE_KEY,
    version: "weekly",
});
const initMap = async () => {
    const googleMaps = await loader.importLibrary("maps");
    map.value = new googleMaps.Map(document.getElementById("map"), {
        center: { lat: internStore.hteInformation.location.lat, lng: internStore.hteInformation.location.lng },
        zoom: 15,
        mapId: "DEMO_MAP_ID",
    });
    marker.value = new google.maps.Marker({
        position: { lat: internStore.hteInformation.location.lat, lng: internStore.hteInformation.location.lng },
        map: map.value,

    });

};


onMounted(async () => {
    initMap()
    await internStore.getHteInformation(route.params.id);
    console.log(internStore.hteInformation._id);
});
</script>

<style lang="scss" scoped></style>
