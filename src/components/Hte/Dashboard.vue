<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </header>
    <div class="flex min-h-screen bg-gray-100">
      <div class="container max-w-6xl p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Interns</h1>
        </header>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-end">
          <div class="p-5 bg-white rounded shadow-sm self-end">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ hteStore.getNumberOfAcceptedInterns }}
                </div>
                <div class="text-gray-400">Accepted Interns</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ hteStore.getNumberOfPendingInterns }}
                </div>
                <div class="text-gray-400">Pending Applications</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm hover:bg-gray-50 cursor-pointer">
            <router-link
              to="#"
              class="flex justify-between items-center space-x-4 space-y-2"
            >
              <div>
                <div class="text-2xl font-bold text-gray-900 underline">Profiles</div>
                <p class="text-gray-400">Manage Interns Profiles</p>
              </div>
              <i class="bx text-xl bx-chevron-right"></i>
            </router-link>
          </div>
        </div>
        <div class="divider p-0"></div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">
            Internship Listing
          </h1>
        </header>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-end">
          <div class="p-5 bg-white rounded shadow-sm self-end">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ hteStore.getNumberOfListing }}
                </div>
                <div class="text-gray-400">Active</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">0</div>
                <div class="text-gray-400">Inactive</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm hover:bg-gray-50 cursor-pointer">
            <router-link
              to="/"
              class="justify-between flex items-center space-x-4 space-y-2"
            >
              <div>
                <div class="text-2xl font-bold text-gray-900 underline">Manage</div>
                <p class="text-gray-400">Manage listings</p>
              </div>
              <i class="bx text-xl bx-chevron-right"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="w-2/6 p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Announcements</h1>
        </header>
        <section>
          <div class="p-5 bg-white rounded shadow-sm">
            <header>date</header>
            <p>Title</p>
            <p>Content</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useHteStore } from "@/stores/HteStore";
import { onMounted } from "vue";
const hteStore = useHteStore();

onMounted(async () => {
  await hteStore.fetchInternships();
  await hteStore.fetchAcceptedInterns();
  await hteStore.fetchPendingInterns();
});
</script>
