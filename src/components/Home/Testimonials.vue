<template>
  <div id="testimonials" class="relative md:h-screen overflow-hidden text-white bg-white">
    <div
      class="container items-center relative z-10 flex justify-between h-full mx-auto text-center text-gray-800"
    >
      <div class="w-full pt-6 md:pt-32 md:pb-32 pb-6 px-3">
        <h1 class="font-bold text-xl md:text-5xl p-6 text-left text-primary">
          Testimonials
        </h1>
        <swiper
          :slides-per-view="3"
          :space-between="50"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :loop="true"
          :modules="modules"
          :navigation="false"
          :breakpoints="{
            '360': {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            '640': {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            '768': {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }"
        >
          <swiper-slide
            ><section class="bg-white dark:bg-gray-900">
              <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure class="max-w-screen-md mx-auto">
                  <svg
                    class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      "OJT Tracker virtual internship portal opened doors to opportunities
                      I never thought possible. The flexibility of virtual internships
                      offered through Internesting allowed me to balance my studies while
                      gaining practical experience. "
                    </p>
                  </blockquote>
                  <figcaption class="flex items-center justify-center mt-6 space-x-3">
                    <img
                      class="w-6 h-6 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                      alt="profile picture"
                    />
                    <div
                      class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700"
                    >
                      <div class="pr-3 font-medium text-gray-900 dark:text-white">
                        Kenneth Roque
                      </div>
                      <div
                        class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"
                      >
                        CEO at Google
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </swiper-slide>
          <swiper-slide
            ><section class="bg-white dark:bg-gray-900">
              <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure class="max-w-screen-md mx-auto">
                  <svg
                    class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      "Navigating the world of online internships can be overwhelming, but
                      Internesting made it effortless. The platform's comprehensive
                      database of internship listings made it easy for me to explore
                      opportunities in my field of interest."
                    </p>
                  </blockquote>
                  <figcaption class="flex items-center justify-center mt-6 space-x-3">
                    <img
                      class="w-6 h-6 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                      alt="profile picture"
                    />
                    <div
                      class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700"
                    >
                      <div class="pr-3 font-medium text-gray-900 dark:text-white">
                        Vanjo Lugtu Carlos
                      </div>
                      <div
                        class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"
                      >
                        CEO at Facebook
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </swiper-slide>
          <swiper-slide>
            <section class="bg-white dark:bg-gray-900">
              <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure class="max-w-screen-md mx-auto">
                  <svg
                    class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      "OJT Tracker internship portal was a game-changer for me. Its
                      intuitive interface made it easy for me to search for and apply to
                      internships that aligned with my interests and career goals. "
                    </p>
                  </blockquote>
                  <figcaption class="flex items-center justify-center mt-6 space-x-3">
                    <img
                      class="w-6 h-6 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                      alt="profile picture"
                    />
                    <div
                      class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700"
                    >
                      <div class="pr-3 font-medium text-gray-900 dark:text-white">
                        Hanz Pungyan
                      </div>
                      <div
                        class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"
                      >
                        CEO at Twitter
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </swiper-slide>
          <swiper-slide
            ><section class="bg-white dark:bg-gray-900">
              <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure class="max-w-screen-md mx-auto">
                  <svg
                    class="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>
                  <blockquote>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      "OJT Tracker internship portal was a game-changer for me. Its
                      intuitive interface made it easy for me to search for and apply to
                      internships that aligned with my interests and career goals.
                    </p>
                  </blockquote>
                  <figcaption class="flex items-center justify-center mt-6 space-x-3">
                    <img
                      class="w-6 h-6 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                      alt="profile picture"
                    />
                    <div
                      class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700"
                    >
                      <div class="pr-3 font-medium text-gray-900 dark:text-white">
                        Micheal Gough
                      </div>
                      <div
                        class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"
                      >
                        CEO at Google
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const modules = [Pagination, Navigation, Autoplay];
</script>

<style lang="scss" scoped></style>
