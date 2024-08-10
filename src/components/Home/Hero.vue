<template>
  <div
    id="hero"
    class="relative h-screen overflow-hidden text-white bg-gradient-to-r from-purple-600 to-blue-600"
  >
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div
      class="container relative z-10 flex items-center justify-between h-full mx-auto text-center"
    >
      <div class="flex flex-col w-3/6 px-3">
        <h1 class="py-8 font-bold text-left text-7xl">Internship simplified</h1>
        <p class="mb-8 text-lg text-left text-gray-300">
          Effortlessly track OJT progress with real-time geolocation and seamless
          communication. Our system ensures you're always in the loop with precise
          tracking and instant messaging. Empower your OJT management with efficiency and
          clarity like never before. Discover amazing features and services that await
          you.
        </p>
        <div class="text-left">
          <router-link
            to="/intern"
            class="inline-block px-6 py-2 text-lg font-semibold text-left text-gray-100 transition duration-300 ease-in-out transform rounded-full btn btn-primary hover:btn-outline hover:scale-105 hover:shadow-lg"
            >Get Started</router-link
          >
        </div>
      </div>

      <div class="w-3/6">
        <img class="w-full" src="/hero-img.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
