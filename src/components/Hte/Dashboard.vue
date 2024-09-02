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
        <div class="grid justify-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfPendingInterns === 0,
              'bg-red-500 text-gray-50': hteStore.getNumberOfPendingInterns != 0,
            }"
            class="p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfPendingInterns }}
                </div>
                <div class="">Pending</div>
              </div>
            </div>
          </div>
          <div class="self-end p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ hteStore.getNumberOfApprovedInterns }}
                </div>
                <div class="text-gray-600">Approved</div>
              </div>
            </div>
          </div>

          <div
            :class="{
              'bg-green-600 text-gray-50': hteStore.getNumberOfAcceptedInterns != 0,
              'bg-white text-gray-900': hteStore.getListOfAcceptedInterns === 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfAcceptedInterns }}
                </div>
                <div class="">Accepted</div>
              </div>
            </div>
          </div>
          <div
            class="self-end p-5 rounded shadow-sm"
            :class="{
              'bg-red-600 text-gray-50': hteStore.getNumberOfAcceptedInterns != 0,
              'bg-white text-gray-900': hteStore.getListOfAcceptedInterns === 0,
            }"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfAcceptedInterns }}
                </div>
                <div class="">For Evaluation</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-0 divider"></div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Listing</h1>
        </header>
        <div class="grid justify-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div class="self-end p-5 bg-white rounded shadow-sm">
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
        </div>
        <div class="p-0 divider"></div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Coordinator</h1>
        </header>
        <div class="grid justify-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div class="self-end p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ hteStore.getNumberOfListing }}
                </div>
                <div class="text-gray-400">Pending</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold text-gray-900">0</div>
                <div class="text-gray-400">Approved</div>
              </div>
            </div>
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
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
  await hteStore.getOnlineInterns();
});
</script>
