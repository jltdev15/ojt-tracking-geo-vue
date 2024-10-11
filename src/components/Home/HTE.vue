<template>
  <div id="partner" class="relative pt-20 text-white bg-white md:h-screen md:overflow-hidden">
    <div class="container relative z-10 flex items-center justify-between h-full mx-auto text-center text-gray-800">
      <div class="w-full md:pt-32 md:pb-32">
        <h1 class="p-6 text-xl font-bold text-left md:text-5xl text-primary">
          Partner's Host Training Establishments
        </h1>
        <section class="grid gap-12 p-6 bg md:grid-cols-3">
          <div v-if="props.internships.length === 0" class="w-full text-left">
            <p>No hte available</p>
          </div>
          <div v-for="item in props.internships" :key="item.id"
            class="flex flex-col gap-3 p-6 rounded-lg shadow-md bg-gray-50 w-96 h-72">
            <div class="text-3xl font-bold text-left">
              <p class="text-xs text-gray-500">Company</p>
              <p class="capitalize">{{ item.fullName }}</p>
            </div>
            <div class="text-left">
              <p class="text-xs font-bold text-gray-500">Details</p>
              <p class="font-bold">{{ item.contactNumber }}</p>
              <p class="font-bold">
                {{ item.street }} {{ item.brgy }} {{ item.municipality }}
                {{ item.province }}
              </p>
            </div>
            <div class="mt-auto text-left">
              <p class="text-xs font-bold text-gray-500">Number of Internships</p>
              <div class="flex items-center justify-between">
                <p class="text-3xl font-bold">{{ item.internVacancy.length }}</p>
                <router-link :to="{ name: 'student_auth' }">
                  <i class="text-3xl border-0 bx bx-chevron-right btn btn-outline shadow-0 btn-accent"></i>
                </router-link>
              </div>
            </div>
            <!-- <router-link
              :to="{ name: 'student_auth' }"
              class="p-3 mt-auto btn-primary btn"
              >Apply Now</router-link
            > -->
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["internships"]);
</script>

<style lang="scss" scoped></style>
