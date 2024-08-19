<template>
  <div class="">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Daily Time Record</h1>
    </header>
    <section class="max-w-xl py-6 bg-gray-400">
      <div class="p-6">
        <p>Time starts at 8:00 am</p>
        <button :disabled="!isLocationEnabled || internStore.isClockIn" @click="timeInHandler"
          class="w-full rounded btn btn-primary ">Clock
          in</button>
      </div>
      <div class="p-6">
        <p>Time ends at 5:00 pm</p>
        <button :disabled="!isLocationEnabled || !internStore.isClockIn" class="w-full rounded btn btn-primary">Clock
          out</button>
      </div>
      <div class="py-3">
        <div v-if="!isLocationEnabled" class="inline-block p-6 bg-red-600">
          <p class="text-center text-gray-50">{{ errorMessage }} - Please enable location or grant permission</p>
        </div>
        <div v-else class="p-6 bg-green-600 ">
          <p class="text-center">Location is granted you can now clock in</p>
        </div>

      </div>
    </section>



  </div>
</template>

<script setup>
import { useInternStore } from '@/stores/InternStore';
import { onMounted, reactive, ref } from 'vue';
const internStore = useInternStore()

const isLocationEnabled = ref(false)

const errorMessage = ref('')
const locationData = reactive({
  lat: '',
  long: ''
})

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
    errorMessage.value = 'Geolocation is not supported by this browser.';
  }
}
const timeInData = reactive({
  timeInLocation: locationData,
  timeIn: new Date().toLocaleString(),
  date: new Date().toLocaleDateString()

})

const timeInHandler = async () => {
  const response = await internStore.clockIn(timeInData)

  console.log(response);

}

onMounted(async () => {
  await internStore.fetchRequiredHours()
  await getLocation()
})


</script>

<style lang="scss" scoped></style>
