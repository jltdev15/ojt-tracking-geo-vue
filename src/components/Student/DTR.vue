<template>
  <div class="">
    <header class="p-3 bg-gray-50 md:text-left text-center">
      <h1 class="text-3xl font-bold">Daily Time Record</h1>
    </header>
    <section class="max-w-sm py-6 bg-gray-100 m-6 rounded-xl shadow-lg">
      <p class="font-bold text-5xl text-center">{{ timeStringData }}</p>
      <div class="p-6">
        <p>Time starts at 8:00 am</p>
        <button
          :disabled="!isLocationEnabled || internStore.isClockIn"
          @click="timeInHandler"
          class="w-full rounded btn btn-primary"
        >
          Clock in
        </button>
        <p
          @click="removeErrorMessage"
          class="flex justify-center items-center gap-3 w-full m-3 py-3 text-gray-50 font-bold text-center mx-auto bg-red-600"
          v-if="clockInErrorMessage"
        >
          {{ clockInErrorMessage }}<i class="text-lg bx bx-info-circle"></i>
        </p>
      </div>
      <div class="p-6">
        <p>Time ends at 5:00 pm</p>
        <button
          @click="timeOutHandler"
          :disabled="!isLocationEnabled || !internStore.isClockIn"
          class="w-full rounded btn btn-primary"
        >
          Clock out
        </button>
      </div>
      <div class="py-3 flex justify-center">
        <div v-if="!isLocationEnabled" class="p-3">
          <p
            class="inline-block md:text-base text-xs text-center bg-red-600 p-3 text-gray-50 font-medium"
          >
            {{ errorMessage }}<span class="block">Please enable your location</span>
          </p>
        </div>
        <div v-else class="p-3 flex justify-center">
          <p
            class="inline-block md:text-base text-xs bg-green-600 p-3 text-gray-50 font-medium"
          >
            Access location granted you can now clock in
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { onMounted, reactive, ref } from "vue";
const internStore = useInternStore();

const isLocationEnabled = ref(false);
const timeStringData = ref("");
const clockInErrorMessage = ref("");
const errorMessage = ref("");
const locationData = reactive({
  lat: "",
  long: "",
});

const updateClock = async () => {
  const now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes());
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  timeStringData.value = `${hours}:${minutes}:${seconds} ${period}`;
};

const getLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationData.lat = position.coords.latitude;
        locationData.long = position.coords.longitude;
        isLocationEnabled.value = true;
      },
      (err) => {
        errorMessage.value = `Error: ${err.message}`;
      }
    );
  } else {
    errorMessage.value = "Geolocation is not supported by this browser.";
  }
};
const removeErrorMessage = () => {
  clockInErrorMessage.value = "";
};
const timeInData = reactive({
  timeInLocation: locationData,
  timeIn: new Date(),
  date: new Date().toLocaleDateString(),
});
const timeOutData = reactive({
  timeOutLocation: locationData,
  timeOut: new Date(),
  date: new Date().toLocaleDateString(),
});

const timeInHandler = async () => {
  try {
    const response = await internStore.clockIn(timeInData);
    console.log(response.response.data.content);
    clockInErrorMessage.value = response.response.data.content;
  } catch (err) {
    console.log(err);
  }
};
const timeOutHandler = async () => {
  try {
    const response = await internStore.clockOut(timeOutData);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  await internStore.fetchRequiredHours();
  await getLocation();
  await updateClock();
  setInterval(updateClock, 1000);
});
</script>

<style lang="scss" scoped></style>
