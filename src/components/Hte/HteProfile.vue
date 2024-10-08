<template>
  <div class="w-full">
    <div class="w-11/12 py-6 mx-auto text-sm md:w-9/12 breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'hte_dashboard' }">Hte Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'hte_profile' }">Profile</router-link>
        </li>
      </ul>
    </div>
    <section class="w-11/12 mx-auto rounded-md shadow-md md:w-9/12 bg-gray-50">
      <header class="p-3 bg-primary text-gray-50">
        <h1 class="text-3xl font-bold">{{ authStore.hteInformation.name }}</h1>
      </header>
      <section class="grid grid-cols-1 p-6 md:grid-cols-2 md:py-3 gap-y-6 gap-x-6">
        <!-- Left side HTE -->
        <div class="flex flex-col gap-3">
          <div>
            <label for="">Company Name</label>
            <input v-model.trim="authStore.hteInformation.name" type="text" placeholder="Type here"
              class="w-full input input-bordered" />
          </div>

          <div>
            <label class="block" for="">Company Email</label>
            <input v-model.trim="authStore.hteInformation.email" type="text" placeholder="Type here"
              class="w-full input input-bordered" />
          </div>

          <div>
            <label for="">Contact Number</label>
            <input v-model.trim="authStore.hteInformation.contact" type="tel" placeholder="11 Digits Contact Number"
              minlength="11" maxlength="11" pattern="[0-9]{11,11}" class="w-full input input-bordered"
              @input="validateContactNumber" />
          </div>

          <div class="">
            <label class="block" for="">Province</label>
            <select class="w-full text-base select select-bordered" v-model="selectedProvince"
              @change="onSelectProvince" required>
              <option selected value="">
                {{ authStore.hteInformation.province }}
              </option>
              <option v-for="item in provinces" :key="item" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="">
            <label class="block" for="">Municipality/City</label>
            <select class="w-full text-base select select-bordered" v-model="selectedMunicipality"
              @change="onSelectMunicipality" required>
              <option selected value="">
                {{ authStore.hteInformation.municipality }}
              </option>
              <option v-for="item in municipality" :key="item" :value="item">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col w-full gap-3 md:flex-row">
            <div class="md:w-96">
              <label class="block" for="">Barangay</label>
              <select class="w-full text-base select select-bordered" v-model="selectedBrgy" @change="onSelectBrgy"
                required>
                <option selected value="">
                  {{ authStore.hteInformation.brgy }}
                </option>
                <option v-for="item in brgy" :key="item" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="md:w-3/6">
              <label class="block" for="">Street </label>
              <input v-model="authStore.hteInformation.street" type="text" placeholder="Type here"
                class="w-full input input-bordered" />
            </div>
          </div>
        </div>
        <!-- Right side -->
        <div class="flex flex-col w-full gap-0">
          <label>Business Name</label>
          <div class="flex gap-3 pb-3">
            <label class="flex items-center justify-between w-full input input-bordered">
              <input v-model.trim="businessName" type="text" class="max-w-xs" placeholder="Business Name" />
            </label>
            <button @click="getBusinessLocation" class="btn btn-outline bt-bloc btn-accent">
              <i class="text-3xl bx bx-search-alt"></i>
            </button>
          </div>

          <label class="flex items-center gap-2 input input-bordered">
            <input v-model="authStore.hteInformation.lat" type="number" class="w-full" placeholder="Latitude"
              readonly />
            <input v-model="authStore.hteInformation.lng" type="number" class="w-full" placeholder="Longtitude"
              readonly />
          </label>
          <div v-if="errorMessage" class="p-3 text-center error">
            {{ errorMessage }}
          </div>
          <div v-if="!locationRes && !errorMessage" class="p-3 text-center error">
            No results to show
          </div>
          <div v-if="isMapShow" id="map" class="h-[250px] w-[100%] mt-3"></div>
          <label class="flex items-center justify-between w-full mt-auto input input-bordered">
            <input v-model.trim="authStore.hteInformation.landMark" type="text" class="w-full" placeholder="LandMark" />
          </label>
        </div>
        <div class="flex justify-between gap-3 md:col-span-2 md:mt-6 md:ml-auto">
          <router-link :to="{ name: 'manage_users', query: { users: 'HTE' } }"
            class="w-3/6 md:w-36 btn btn-accent btn-outline">
            Cancel
          </router-link>
          <button type="button" @click="updateInformationHandler" class="w-3/6 md:w-36 btn btn-md btn-primary">
            Update
          </button>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const isEditEnable = ref(false);

const selectedProvince = ref("");
const selectedMunicipality = ref("");
const selectedBrgy = ref("");
const provinces = ref([]);
const municipality = ref([]);
const brgy = ref([]);
// const businessName = ref(authStore.hteInformation.name);
const businessName = ref("");

const updateInformationHandler = async () => {
  await authStore.updateHteInfo();
  alert("Update success!");
  router.replace({ name: "hte_profile" });
};

const getProvinces = async () => {
  try {
    const response = await axios.get("https://psgc.gitlab.io/api/provinces/");
    console.log(response.data);
    provinces.value = response.data.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.log(err);
  }
};
const getMunicipalities = async (selectedProvince) => {
  try {
    const response = await axios.get(
      `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`
    );
    console.log(response.data);
    municipality.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
const getBrgy = async (selectedMunicipality) => {
  try {
    const response = await axios.get(
      `https://psgc.gitlab.io/api/cities-municipalities/${selectedMunicipality}/barangays/`
    );
    console.log(response.data);
    brgy.value = response.data;
  } catch (err) {
    console.log(err);
  }
};
const onSelectProvince = async () => {
  await getMunicipalities(selectedProvince.value.code);
  authStore.hteInformation.province = selectedProvince.value.name;
};
const onSelectMunicipality = async () => {
  await getBrgy(selectedMunicipality.value.code);
  authStore.hteInformation.municipality = selectedMunicipality.value.name;
};
const onSelectBrgy = () => {
  authStore.hteInformation.brgy = selectedBrgy.value.name;

  // coordinator.brgy = selectedBrgy.value.name;
};
onMounted(async () => {
  await getProvinces();
  // businessName.value = authStore.hteInformation.name;
  // await getBusinessLocation();
});

const locationRes = ref(null);
const errorMessage = ref(null);
const map = ref(null);
const marker = ref(null);
const isMapShow = ref(true);

const getBusinessLocation = async () => {
  if (!businessName.value.trim()) {
    authStore.hteInformation.lat = "";
    authStore.hteInformation.lng = "";
    errorMessage.value = "Please enter a business name.";
    isMapShow.value = false;
    return;
  }
  isMapShow.value = true;
  errorMessage.value = null;
  try {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_API_GOOGLE_KEY, // Replace with your actual API key
      libraries: ["places"],
      version: "weekly",
    });

    const { PlacesService } = await loader.importLibrary("places");

    const service = new PlacesService(document.createElement("div"));

    const request = {
      query: businessName.value,
      fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const place = results[0];
        locationRes.value = place.geometry.location.toJSON();
        authStore.hteInformation.lat = locationRes.value.lat;
        authStore.hteInformation.lng = locationRes.value.lng;
        initMap();
      } else {
        errorMessage.value = "Business not found.";
        locationRes.value = null;
        isMapShow.value = false;
        initMap();
      }
    });
  } catch (err) {
    console.error(err);
    errorMessage.value = "An error occurred while fetching the location.";
  }
};

const initMap = () => {
  map.value = new google.maps.Map(document.getElementById("map"), {
    center: locationRes.value,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });
  marker.value = new google.maps.Marker({
    position: locationRes.value,
    map: map.value,
    draggable: true,
  });
  marker.value.addListener("dragend", (event) => {
    authStore.hteInformation.lat = event.latLng.lat().toFixed(7);
    authStore.hteInformation.lng = event.latLng.lng().toFixed(6);
  });
  map.value.addListener("click", (event) => {
    const clickedLocation = event.latLng;
    authStore.hteInformation.lat = clickedLocation.lat().toFixed(7);
    authStore.hteInformation.lng = clickedLocation.lng().toFixed(6);

    // Move the marker to the clicked location
    marker.value.setPosition(clickedLocation);
  });
};


const validateContactNumber = () => {
  // Remove any non-digit characters
  authStore.hteInformation.contact = authStore.hteInformation.contact.replace(/\D/g, '');
  authStore.hteInformation.contact = authStore.hteInformation.contact.slice(0, 11);
  // Check if the input exceeds 11 digits
  // if (contactNumber.value.length > 11) {
  //   errorMessage.value = 'Contact number cannot exceed 11 digits';
  //   // Truncate the value to 11 digits

  // } else {
  //   errorMessage.value = '';
  // }
};
</script>

<style scoped>
label {
  font-weight: 600;
  margin-bottom: 12px;
}
</style>
