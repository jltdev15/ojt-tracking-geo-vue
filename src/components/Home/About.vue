<template>
  <div
    class="relative h-screen overflow-hidden text-white bg-gradient-to-r from-purple-600 to-blue-600"
  >
    <div class="absolute inset-0">
      <img
        src="/dhvsu.jpg"
        alt="Background Image"
        class="object-cover object-center w-full h-full"
      />
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <div
      class="relative z-10 flex flex-col items-center justify-center h-full text-center"
    >
      <h1 class="py-6 text-3xl font-bold text-center md:py-8 md:text-left md:text-7xl">
        Internship simplified
      </h1>
      <p
        class="container mb-8 text-base md:text-left text-gray-300 md:text-lg px-3 text-justify"
      >
        Effortlessly track OJT progress with real-time geolocation and seamless
        communication. Our system ensures you're always in the loop with precise tracking
        and instant messaging. Empower your OJT management with efficiency and clarity
        like never before. Discover amazing features and services that await you.
      </p>
      <div class="md:text-left">
        <router-link
          to="/auth"
          class="inline-block px-6 py-2 text-lg font-semibold text-left text-gray-100 transition duration-300 ease-in-out transform rounded-full btn bg-[#da1f26] hover:btn-outline hover:scale-105 hover:shadow-lg"
          >Get Started</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
