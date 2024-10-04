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
        <section class="bg grid gap-12 md:grid-cols-3">
          <div
            v-for="item in props.internships"
            :key="item.id"
            class="aspect-square flex gap-3 flex-col bg-gray-50 p-6 shadow-md rounded-lg"
          >
            <div class="flex justify-between text-3xl font-bold">
              <p class="">{{ item.hte.fullName }}</p>
            </div>

            <div class="">
              <div class="text-xl font-bold text-left">{{ item.title }}</div>
              <p class="text-xs text-gray-700 text-left">
                {{ item.requirements }}
              </p>
            </div>
            <div class="flex flex-col items-start w-full p-3">
              <p class="text-base font-bold">Slots {{ item.slots }}</p>
              <p class="text-sm font-medium text-gray-400">{{ item.location }}</p>
            </div>
            <router-link
              :to="{ name: 'student_auth' }"
              class="mt-auto p-3 btn-primary btn"
              >Apply Now</router-link
            >
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
