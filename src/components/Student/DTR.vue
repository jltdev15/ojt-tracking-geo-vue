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
          :disabled="!internStore.isLocationEnabled || internStore.isClockIn"
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
          :disabled="!internStore.isLocationEnabled || !internStore.isClockIn"
          class="w-full rounded btn btn-primary"
        >
          Clock out
        </button>
      </div>
      <div class="py-3 flex justify-center">
        <div v-if="!internStore.isLocationEnabled" class="p-3">
          <p
            class="inline-block md:text-base text-xs text-center bg-red-600 p-3 text-gray-50 font-medium"
          >
            {{ internStore.errorMessage
            }}<span class="block">Please enable your location</span>
          </p>
        </div>
        <div v-else class="p-3 flex justify-center">
          <p
            class="inline-block md:text-xs text-[0.6rem] bg-green-600 p-3 text-gray-50 font-medium"
          >
            Access location granted you can now clock in/clock out
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useInternStore } from "@/stores/InternStore";
import { onMounted, reactive, ref, onUnmounted } from "vue";
const internStore = useInternStore();
const router = useRouter();
const timeStringData = ref("");
const clockInErrorMessage = ref("");

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
    if (response) {
      return (clockInErrorMessage.value = response.response.data.content);
    }
    await startPolling();
  } catch (err) {
    console.log(err);
  }
};
const timeOutHandler = async () => {
  try {
    const response = await internStore.clockOut(timeOutData);
    router.push({ name: "student_dashboard" });
    console.log(response);
  } catch (err) {
    clearInterval(intervalid);
    console.log(err);
  }
};
let intervalid = null;

const startPolling = async () => {
  if (internStore.isClockIn) {
    return (intervalid = setInterval(internStore.sendLocationHandler, 3000));
  } else {
    clearInterval(intervalid);
  }
};
onMounted(async () => {
  await internStore.getLocationHandler();
  await startPolling();
  await internStore.fetchRequiredHours();
  await updateClock();
  setInterval(updateClock, 1000);
});

onUnmounted(async () => {
  if (intervalid) {
    clearInterval(intervalid);
  }
});
</script>

<style lang="scss" scoped></style>
