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
              <p class="font-bold bg-green-600 rounded-md text-gray-50">Inside</p>
            </div>
            <div v-else-if="item.isInside === null" class="w-full text-center">
              <p class="font-bold bg-red-600 rounded-md text-gray-50">Location lost</p>
            </div>
            <div v-else class="w-full text-center">
              <p class="font-bold bg-red-600 rounded-md text-gray-50">Outside</p>
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
import { toRaw } from "vue";
import apiClient from "@/config/axiosClient";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "vue-router";
import { onMounted, ref, onUnmounted, watch } from "vue";
import { useHteStore } from "@/stores/HteStore";
import { useAuthStore } from "@/stores/AuthStore";
const router = useRouter();
const authStore = useAuthStore();
const hteStore = useHteStore();
const isMapShow = ref(false);
let intervalId = null;
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
const markers = ref({});
const locationArr = ref([]);
const onlineInternLists = ref([]);
const loader = new Loader({
  apiKey: import.meta.env.VITE_API_GOOGLE_KEY,
  version: "weekly",
});
const initMap = async () => {
  // Import both the maps and geometry libraries
  const googleMaps = await loader.importLibrary("maps");

  const mapOptions = {
    center: {
      lat: authStore.hteLocationDefault.lat,
      lng: authStore.hteLocationDefault.lng,
    }, // Your default map center
    mapId: "DEMO_MAP_ID",
    zoom: 20,
    mapTypeControl: false,
  };

  map.value = new googleMaps.Map(document.getElementById("map"), mapOptions);

  geofenceCircle.value = new googleMaps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map: map.value,
    center: {
      lat: authStore.hteLocationDefault.lat,
      lng: authStore.hteLocationDefault.lng,
    }, // Center of the geofence
    radius: 10, // Geofence radius in meters
  });
};

const addMarker = (intern) => {
  // initMap();
  const marker = new google.maps.Marker({
    position: { lat: intern.currentLocation.lat, lng: intern.currentLocation.lng },
    map: map.value,
  });
  markers.value[intern.internId] = marker;
  console.log(`Marker added for intern ID: ${intern.internId}`);
  // if (isInsideGeofence) {
  //   marker.setIcon("https://maps.google.com/mapfiles/ms/icons/green-dot.png"); // Set green icon for inside
  // } else {
  //   marker.setIcon("https://maps.google.com/mapfiles/ms/icons/red-dot.png"); // Set red icon for outside
  // }

  // markers.value[position.id] = marker; // Store marker reference by intern ID
};
const removeMarker = (internId) => {
  const marker = markers.value[internId];
  if (marker) {
    toRaw(marker).setMap(null); // Remove marker from the map
    delete markers.value[internId]; // Remove the marker from the markers object
    console.log(`Marker for intern ID: ${internId} removed`);
  }
};
const generateFence = async (onlineInterns) => {
  locationArr.value = [];
  const googleGeometry = await loader.importLibrary("geometry");
  const results = onlineInterns.map((location) => {
    let position = null;
    let isInsideGeofence = null;
    if (!location.currentLocation.lat && !location.currentLocation.lng) {
      position = null;
    } else {
      position = new google.maps.LatLng(
        location.currentLocation.lat,
        location.currentLocation.lng
      );
      isInsideGeofence =
        googleGeometry.spherical.computeDistanceBetween(
          position,
          geofenceCircle.value.getCenter()
        ) <= geofenceCircle.value.getRadius();
    }
    const objLocation = {
      id: location._id,
      name: location.name,
      timeIn: location.timeIn,
      isInside: isInsideGeofence,
      position: position,
    };

    return objLocation;
  });

  locationArr.value.push(...results);
};
const pollOnlineInterns = async () => {
  intervalId = setInterval(async () => {
    const response = await apiClient.get(`/hte/internship/online`);
    onlineInternLists.value = response.data.content;
    // generateFence(onlineInternLists.value);
  }, 500);
};
watch(
  onlineInternLists,
  (newInterns, oldInterns) => {
    generateFence(newInterns);
    oldInterns = oldInterns || [];
    newInterns = newInterns || [];
    // Clear markers for interns who clocked out (not in new list)
    oldInterns.forEach((oldIntern) => {
      if (!newInterns.some((newIntern) => newIntern.internId === oldIntern.internId)) {
        console.log("Removing Intern marker");
        console.log(oldIntern);

        removeMarker(oldIntern.internId);
      }
    });

    // Add markers for new interns who clocked in
    newInterns.forEach((intern) => {
      if (!markers.value[intern.internId]) {
        console.log("Adding Intern marker");
        addMarker(intern); // Add marker for newly clocked-in intern
      } else {
        console.log("Watching Intern marker for location changes" + intern.internId);
        watch(
          () => intern.currentLocation, // Assuming `location` contains lat and lng
          (newLocation, oldLocation) => {
            if (
              newLocation.lat !== oldLocation.lat ||
              newLocation.lng !== oldLocation.lng
            ) {
              updateMarker(intern); // Update marker if location changes
            }
          },
          { deep: true } // Ensure deep watching for location changes
        );
      }
    });
  },
  {
    // deep: true, // Watch deep changes (like adding/removing items)
    immediate: true, // Trigger immediately when the component is mounted
  }
);

function updateMarker(intern) {
  if (markers.value[intern.internId]) {
    // Assuming `intern` contains latitude and longitude
    const position = new google.maps.LatLng(
      intern.currentLocation.lat,
      intern.currentLocation.lng
    );
    markers.value[intern.internId].setPosition(position);
  }
}

onMounted(async () => {
  initMap();
  pollOnlineInterns();
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped></style>
