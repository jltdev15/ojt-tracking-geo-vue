<template>
  <div id="contact" class="relative h-screen overflow-hidden text-white bg-white">
    <div
      class="container items-center relative z-10 flex justify-between h-full mx-auto text-gray-800"
    >
      <div class="w-full pt-6 md:pt-32 md:pb-32 pb-6">
        <section class="bg-white dark:bg-gray-100">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2
              class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900"
            >
              Contact Us
            </h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
              Got a technical issue? Want to send feedback about a beta feature? Let us
              know.
            </p>
            <form action="#" class="space-y-8">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
                  >Your email</label
                >
                <input
                  type="email"
                  id="email"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <label for="subject" class="block mb-2 text-sm font-medium text-gray-900"
                  >Subject</label
                >
                <input
                  type="text"
                  id="subject"
                  class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900"
                  >Your message</label
                >
                <textarea
                  id="message"
                  rows="6"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary btn focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
