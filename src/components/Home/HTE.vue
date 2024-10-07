<template>
  <div
    id="partner"
    class="relative pt-20 text-white bg-white md:h-screen md:overflow-hidden"
  >
    <div
      class="container relative z-10 flex items-center justify-between h-full mx-auto text-center text-gray-800"
    >
      <div class="w-full md:pt-32 md:pb-32">
        <h1 class="p-6 text-xl font-bold text-left md:text-5xl text-primary">
          Partner's Host Training Establishments
        </h1>
        <section class="bg grid gap-12 md:grid-cols-3 p-6">
          <div
            v-for="item in props.internships"
            :key="item.id"
            class="flex gap-3 flex-col bg-gray-50 p-6 shadow-md rounded-lg w-96 h-72"
          >
            <div class="text-left text-3xl font-bold">
              <p class="text-xs text-gray-500">Company</p>
              <p class="capitalize">{{ item.fullName }}</p>
            </div>
            <div class="text-left">
              <p class="text-xs text-gray-500 font-bold">Details</p>
              <p class="font-bold">{{ item.contactNumber }}</p>
              <p class="font-bold">
                {{ item.street }} {{ item.brgy }} {{ item.municipality }}
                {{ item.province }}
              </p>
            </div>
            <div class="text-left mt-auto">
              <p class="text-xs text-gray-500 font-bold">Number of Internships</p>
              <div class="flex items-center justify-between">
                <p class="font-bold text-3xl">{{ item.internVacancy.length }}</p>
                <router-link :to="{ name: 'student_auth' }">
                  <i
                    class="bx bx-chevron-right text-3xl btn btn-outline border-0 shadow-0 btn-accent"
                  ></i>
                </router-link>
              </div>
            </div>
            <!-- <router-link
              :to="{ name: 'student_auth' }"
              class="mt-auto p-3 btn-primary btn"
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
