<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Intern Monitoring</h1>
    </header>
    <div class="grid w-full grid-cols-2 gap-6">
      <EasyDataTable
        :headers="headers"
        :items="hteStore.onlineInternList"
        border-cell
        :rows-per-page="10"
        table-class-name="customize-table"
      >
        <template #item-status="item">
          <div
            v-if="
              item.currentLocation.lat === hteStore.hteLocationDefault.lat &&
              item.currentLocation.lng === hteStore.hteLocationDefault.lng
            "
          >
            <p class="inline-block p-3 font-bold bg-green-600 rounded-md text-gray-50">
              Inside
            </p>
          </div>
          <div
            v-else-if="
              item.currentLocation.lat === null && item.currentLocation.lng === null
            "
          >
            <p class="inline-block p-3 font-bold bg-red-600 rounded-md text-gray-50">
              Connection lost
            </p>
          </div>
          <div v-else>
            <p class="inline-block p-3 font-bold bg-red-600 rounded-md text-gray-50">
              Outside
            </p>
          </div>
        </template>
      </EasyDataTable>
      <div
        v-if="hteStore.onlineLocationList.length > 0"
        id="map"
        style="height: 300px; width: 100%"
      ></div>
      <div v-else>
        <p>No currently online</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, onUnmounted, watch } from "vue";
import { useHteStore } from "@/stores/HteStore";
const hteStore = useHteStore();
const locationList = ref([]);

// console.log(hteStore.hteLocationDefault.lat);
// hteStore.onlineInternList.forEach((item) => internLocations.push(item));
// console.log(hteStore.onlineInternList);
const isMapShow = ref(false);
const headers = [
  { text: "INTERN", value: "name" },
  { text: "TIME IN", value: "timeIn" },
  { text: "STATUS", value: "status" },
];

const getOnlineInternHandler = async () => {
  await hteStore.getOnlineInterns();
};
let intervalid = null;
let map;
async function initMap() {
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  const mapCenter =
    hteStore.onlineLocationList.length > 0
      ? {
          lat: hteStore.onlineLocationList[0].lat,
          lng: hteStore.onlineLocationList[0].lng,
        }
      : { lat: 0, lng: 0 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: mapCenter,
    mapId: "DEMO_MAP_ID",
  });

  addMarkers();
}

function addMarkers() {
  hteStore.onlineLocationList.forEach((location) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${location.title}</h3>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

// Watch the internLocations array for changes and refresh the map
watch(locationList, async (newLocations, oldLocations) => {
  console.log(newLocations);

  if (JSON.stringify(newLocations) !== JSON.stringify(oldLocations)) {
    if (newLocations.length > 0) {
      // Clear existing markers
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center:
          newLocations.length > 0
            ? { lat: newLocations[0].lat, lng: newLocations[0].lng }
            : { lat: 0, lng: 0 },
        mapId: "DEMO_MAP_ID",
      });

      addMarkers();
    } else {
      isMapShow.value = false;
    }
  }
});
onMounted(async () => {
  await hteStore.fetchInternships();
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
  await hteStore.getOnlineInterns();
  if (hteStore.onlineInternList.length > 0) {
    intervalid = setInterval(getOnlineInternHandler, 3000);
  } else {
    clearInterval(intervalid);
  }
  locationList.value = hteStore.onlineInternList;
  // Dynamically load the Google Maps script
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${
    import.meta.env.VITE_API_GOOGLE_KEY
  }&callback=initMap`;
  script.async = true;
  script.defer = true;
  window.initMap = initMap; // Assign initMap to the global window object
  document.head.appendChild(script);
});
onUnmounted(async () => {
  clearInterval(intervalid);
});
</script>

<style scoped>
.customize-table {
  --easy-table-header-font-color: #fff;
  --easy-table-header-background-color: #ae1818;
}
</style>
