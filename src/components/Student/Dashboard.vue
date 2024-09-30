<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="p-3 bg-red-600 rounded-md text-gray-50" v-if=" internStore.getNumberOfHoursWorked >= internStore.getNumberOfHoursRequired">Congratulations! Goodluck to your next Journey!</p>
    </header>
    <div class="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      <div class="container max-w-6xl p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Hours Required</h1>
        </header>
        <div class="grid items-end grid-cols-2 gap-7 sm:grid-cols-2 justify-self-right lg:grid-cols-3">
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-sm text-gray-400">Target Hours</div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ internStore.getNumberOfHoursRequired }}
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-sm text-gray-400">Remaining Hours</div>
                <div class="text-2xl font-bold text-gray-900">
                  {{
                    internStore.getNumberOfHoursWorked >=
                      internStore.getNumberOfHoursRequired
                      ? "0"
                      : internStore.getNumberOfHoursRequired -
                      internStore.getNumberOfHoursWorked.toFixed(0)
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 rounded shadow-sm" :class="{'bg-green-600 text-gray-50':  internStore.getNumberOfHoursWorked >= internStore.getNumberOfHoursRequired,'text-gray-900 bg-white':internStore.getNumberOfHoursWorked < internStore.getNumberOfHoursRequired }">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-sm md:text-base">Rendered Hours</div>
                <div class="text-2xl font-bold ">
                  {{ internStore.getNumberOfHoursWorked }}
                </div>
              </div>
            </div>
          </div>

        </div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">
            Internship Application
          </h1>
        </header>
        <div class="grid grid-cols-2 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Pending</div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ internStore.getNumberOfPendingApplication }}
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 rounded shadow-sm" :class="{
            'bg-red-700 text-gray-50': internStore.getNumberOfApprovedApplication != 0,
            'bg-white': internStore.getNumberOfApprovedApplication == 0,
          }">
            <router-link v-if="internStore.getNumberOfApprovedApplication != 0" :to="{ name: 'ApplicationStatus' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="">Approved</div>

                <div class="text-2xl font-bold">
                  {{ internStore.getNumberOfApprovedApplication }}
                </div>
              </div>
            </router-link>
            <div v-else class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Approved</div>

                <div class="text-2xl font-bold text-gray-900">
                  {{ internStore.getNumberOfApprovedApplication }}
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Declined</div>
                <div class="text-2xl font-bold text-gray-900">0</div>
              </div>
            </div>
          </div>
          <div class="p-5 rounded shadow-sm" :class="{
            'bg-green-600 text-slate-50':
              internStore.getNumberOfAcceptedApplication != 0,
            'bg-white': internStore.getNumberOfAcceptedApplication == 0,
          }">
            <router-link v-if="internStore.getNumberOfAcceptedApplication != 0" :to="{ name: 'ApplicationStatus' }"
              class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="">Accepted</div>
                <div class="text-2xl font-bold">
                  {{ internStore.getNumberOfAcceptedApplication }}
                </div>
              </div>
            </router-link>
            <div v-else class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-gray-400">Accepted</div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ internStore.getNumberOfAcceptedApplication }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="p-5 md:w-3/6">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Announcements</h1>
        </header>
        <section>
          <ul class="flex flex-col h-screen gap-3 p-2 overflow-auto rounded shadow-sm">
            <p v-if="adminUserStore.announcementList.length === 0">No announcement yet</p>

            <AnnouncementItem v-for="data in adminUserStore.announcementList" :key="data.id" :title="data.title"
              :description="data.description" :author="data.author" :date="data.date" :role="data.role" />
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAdminUserStore } from "@/stores/AdminUserStore";
import AnnouncementItem from "../AnnouncementItem.vue";
import { onMounted, onUnmounted, reactive } from "vue";
import { useInternStore } from "@/stores/InternStore";
const internStore = useInternStore();
const adminUserStore = useAdminUserStore();
let intervalid = null;

onMounted(async () => {
  await internStore.fetchApplicationList();
  await internStore.fetchRequiredHours();
  await adminUserStore.fetchAnnouncement();
  if (internStore.isClockIn) {
    return (intervalid = setInterval(internStore.sendLocationHandler, 3000));
  } else {
    clearInterval(intervalid);
  }
});

onUnmounted(async () => {
  if (intervalid) {
    clearInterval(intervalid);
  }
});
</script>
