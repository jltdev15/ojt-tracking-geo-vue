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
        <section class="bg">
<InternshipItem :show="true"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import InternshipItem from '../Student/InternshipItem.vue';
</script>

<style lang="scss" scoped></style>
