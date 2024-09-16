<template>
  <div class="">
    <header class="p-3 text-center bg-gray-50 md:text-left">
      <h1 class="text-3xl font-bold">Daily Time Record</h1>
    </header>
    <section
      v-if="internStore.isInternReady"
      class="max-w-sm py-6 m-6 bg-gray-100 shadow-lg rounded-xl"
    >
      <p class="text-5xl font-bold text-center">{{ timeStringData }}</p>
      <div class="p-6">
        <p>Time starts at 8:00 am</p>
        <button
          :disabled="!internStore.isLocationEnabled || internStore.isClockIn"
          @click="timeInHandler"
          class="w-full rounded btn btn-primary"
        >
          Clock in
        </button>
        <p
          @click="removeErrorMessage"
          class="flex items-center justify-center w-full gap-3 py-3 m-3 mx-auto font-bold text-center bg-red-600 text-gray-50"
          v-if="clockInErrorMessage"
        >
          {{ clockInErrorMessage }}<i class="text-lg bx bx-info-circle"></i>
        </p>
      </div>
      <div class="p-6">
        <p>Time ends at 5:00 pm</p>
        <button
          @click="timeOutHandler"
          :disabled="!internStore.isLocationEnabled || !internStore.isClockIn"
          class="w-full rounded btn btn-primary"
        >
          Clock out
        </button>
      </div>
      <div class="flex justify-center py-3">
        <div v-if="!internStore.isLocationEnabled" class="p-3">
          <p
            class="inline-block p-3 text-xs font-medium text-center bg-red-600 md:text-base text-gray-50"
          >
            {{ internStore.errorMessage
            }}<span class="block">Please enable your location</span>
          </p>
        </div>
        <div v-else class="flex justify-center p-3">
          <p
            class="inline-block md:text-xs text-[0.6rem] bg-green-600 p-3 text-gray-50 font-medium"
          >
            Access location granted you can now clock in/clock out
          </p>
        </div>
      </div>
    </section>
    <section v-else class="w-96 p-6">
      <div>
        <p class="text-center p-6 bg-red-600 font-bold text-gray-50">
          Please apply internship
        </p>
        <router-link
          to="/student/dashboard/internships"
          class="flex items-center mt-3 font-medium text-center cursor-pointer btn-outline btn-accent btn hover:text-blue-600"
          >Browse Interships</router-link
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useInternStore } from "@/stores/InternStore";
import { onMounted, reactive, ref, onBeforeUnmount } from "vue";
const internStore = useInternStore();
const router = useRouter();
const timeStringData = ref("");
const clockInErrorMessage = ref("");
let intervalid = null;
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

const removeErrorMessage = () => {
  clockInErrorMessage.value = "";
};
const timeInData = reactive({
  timeInLocation: internStore.locationData,
  timeIn: new Date(),
  date: new Date().toLocaleDateString(),
});
const timeOutData = reactive({
  timeOutLocation: internStore.locationData,
  timeOut: new Date(),
  date: new Date().toLocaleDateString(),
});

const timeInHandler = async () => {
  try {
    const response = await internStore.clockIn(timeInData);
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    if (response.response.data.content) {
      return (clockInErrorMessage.value = response.response.data.content);
    }
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
const timeOutHandler = async () => {
  try {
    const response = await internStore.clockOut(timeOutData);

    if (intervalid) {
      clearInterval(intervalid);
    }
  } catch (err) {
    clearInterval(intervalid);
    console.log(err);
  }
};
const startInterval = () => {
  intervalid = setInterval(() => {
    internStore.sendLocationHandler();
  }, 1000);
};
onMounted(async () => {
  await internStore.fetchRequiredHours();
  if (internStore.isClockIn) {
    startInterval();
  }
  await internStore.getLocationHandler();

  await updateClock();
  setInterval(updateClock, 1000);
});

onBeforeUnmount(async () => {
  if (intervalid) {
    clearInterval(intervalid);
  }
});
</script>

<style lang="scss" scoped></style>
