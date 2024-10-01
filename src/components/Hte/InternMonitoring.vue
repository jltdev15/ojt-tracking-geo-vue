<template>
  <div class="p-3 py-3 mx-auto md:w-11/12">
    <div class="py-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AcceptedList' }">Monitoring</router-link>
        </li>
      </ul>
    </div>
    <div class="p-3 rounded-md shadow-md md:p-6 bg-gray-50">
      <header class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Intern Monitoring</h1>
      </header>
      <div class="grid w-full gap-6 md:grid-cols-2">
        <EasyDataTable :headers="headers" :items="locationArr" border-cell :rows-per-page="10"
          table-class-name="customize-table">
          <template #item-status="item">
            <div class="text-center" v-if="item.isInside">
              <p class="font-bold bg-green-600 rounded-md text-gray-50">
                Inside
              </p>
            </div>
            <div v-else class="w-full text-center">
              <p class="font-bold bg-red-600 rounded-md text-gray-50">
                Outside
              </p>
            </div>
          </template>
        </EasyDataTable>
        <div>
          <div id="map" style="height: 300px; width: 100%"></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "vue-router";
import { onMounted, ref, onUnmounted, watch } from "vue";
import { useHteStore } from "@/stores/HteStore";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
const hteStore = useHteStore();
const isMapShow = ref(false);
const headers = [
  { text: "INTERN", value: "name" },
  { text: "TIME IN", value: "timeIn" },
  { text: "STATUS", value: "status" },
];

const getOnlineInternHandler = async () => {
  await hteStore.getOnlineInterns();
};
const map = ref(null);
const geofenceCircle = ref(null);
const userLocationMarker = ref(null);
const markers = ref([]);
const locationArr = ref([])
onMounted(async () => {
  await hteStore.getOnlineInterns();
  const loader = new Loader({
    apiKey: import.meta.env.VITE_API_GOOGLE_KEY,
    version: 'weekly',
  });

  // Import both the maps and geometry libraries
  const googleMaps = await loader.importLibrary('maps');
  const googleGeometry = await loader.importLibrary('geometry');

  const mapOptions = {
    center: { lat: authStore.hteLocationDefault.lat, lng: authStore.hteLocationDefault.lng }, // Your default map center
    mapId: "DEMO_MAP_ID",
    zoom: 20,
    mapTypeControl: false,
  };

  map.value = new googleMaps.Map(document.getElementById('map'), mapOptions);

  geofenceCircle.value = new googleMaps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map.value,
    center: { lat: authStore.hteLocationDefault.lat, lng: authStore.hteLocationDefault.lng }, // Center of the geofence
    radius: 5, // Geofence radius in meters
  });
  const results = hteStore.onlineInternList.map((location) => {
    let position = null;
    let isInsideGeofence = null;
    if (!location.currentLocation.lat && !location.currentLocation.lng) {
      position = null;
    } else {
      position = new google.maps.LatLng(location.currentLocation.lat, location.currentLocation.lng);
      isInsideGeofence = googleGeometry.spherical.computeDistanceBetween(
        position,
        geofenceCircle.value.getCenter()
      ) <= geofenceCircle.value.getRadius();
    }

    const marker = new google.maps.Marker({
      position: position,
      map: map.value,
    });

    // Store marker in markers array
    // markers.value.push(marker.position);
    // Check if marker is inside geofence

    console.log(isInsideGeofence);

    const objLocation = {
      name: location.name,
      timeIn: location.timeIn,
      isInside: isInsideGeofence,
      position: position

    }
    if (isInsideGeofence) {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png'); // Set green icon for inside
    } else {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png'); // Set red icon for outside
    }

    return objLocation;


  });

  locationArr.value.push(...results)

  console.log(locationArr.value);


});

</script>

<style scoped></style>
