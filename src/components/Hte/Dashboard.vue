<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </header>
    <div class="flex min-h-screen bg-gray-100">
      <div class="container max-w-6xl p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Listing</h1>
        </header>
        <div class="grid justify-end gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div class="self-end p-5 bg-white rounded shadow-sm">
            <router-link
              v-if="hteStore.getNumberOfListing != 0"
              :to="{ name: 'hte_vacancy' }"
              class="flex items-center space-x-4 space-y-2"
            >
              <div>
                <div class="text-2xl font-bold text-red-700">
                  {{ hteStore.getNumberOfListing }}
                </div>
                <div class="text-red-700">Active</div>
              </div>
            </router-link>
            <div
              v-if="hteStore.getNumberOfListing === 0"
              class="flex items-center space-x-4 space-y-2"
            >
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ hteStore.getNumberOfListing }}
                </div>
                <div class="text-gray-400">Active</div>
              </div>
            </div>
          </div>
        </div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Interns</h1>
        </header>
        <div class="grid justify-end gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfPendingInterns === 0,
              'bg-red-500 text-gray-50': hteStore.getNumberOfPendingInterns != 0,
            }"
            class="p-5 rounded shadow-sm"
          >
            <div
              v-if="hteStore.getNumberOfPendingInterns === 0"
              class="flex items-center space-x-4 space-y-2"
            >
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfPendingInterns }}
                </div>
                <div class="">Pending</div>
              </div>
            </div>
            <router-link
              :to="{ name: 'ApplicantsList' }"
              v-if="hteStore.getNumberOfPendingInterns != 0"
              class="flex items-center space-x-4 space-y-2"
            >
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfPendingInterns }}
                </div>
                <div class="">Pending</div>
              </div>
            </router-link>
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
              'bg-white text-gray-900': hteStore.getNumberOfAcceptedInterns === 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <router-link
                v-if="hteStore.getNumberOfAcceptedInterns !== 0"
                :to="{ name: 'AcceptedList' }"
              >
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfAcceptedInterns }}
                </div>
                <div class="">Accepted</div>
              </router-link>
              <div v-if="hteStore.getNumberOfAcceptedInterns === 0">
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfAcceptedInterns }}
                </div>
                <div class="">Accepted</div>
              </div>
            </div>
          </div>
          <router-link
            :to="{ name: 'AcceptedList' }"
            v-if="hteStore.getNumberOfInternForEvaluation"
            class="self-end p-5 rounded shadow-sm"
            :class="{
              'bg-red-600 text-gray-50': hteStore.getNumberOfInternForEvaluation != 0,
              'bg-white text-gray-900': hteStore.getNumberOfInternForEvaluation === 0,
            }"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfInternForEvaluation }}
                </div>
                <div class="">For Evaluation</div>
              </div>
            </div>
          </router-link>
          <div
            v-else
            class="self-end p-5 rounded shadow-sm"
            :class="{
              'bg-red-600 text-gray-50': hteStore.getNumberOfInternForEvaluation != 0,
              'bg-white text-gray-900': hteStore.getNumberOfInternForEvaluation === 0,
            }"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfInternForEvaluation }}
                </div>
                <div class="">For Evaluation</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-0 divider"></div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">
            Coordinator Request Visitation
          </h1>
        </header>
        <div class="grid justify-end gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <!-- Pending -->
          <router-link
            v-if="hteStore.getNumberOfVisitPendingRequest"
            :to="{ name: 'VisitRequest' }"
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfVisitPendingRequest === 0,
              'bg-red-500 text-gray-50': hteStore.getNumberOfVisitPendingRequest != 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfVisitPendingRequest }}
                </div>
                <div>Pending</div>
              </div>
            </div>
          </router-link>
          <div
            v-else
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfVisitPendingRequest === 0,
              'bg-red-500 text-gray-50': hteStore.getNumberOfVisitPendingRequest != 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfVisitPendingRequest }}
                </div>
                <div>Pending</div>
              </div>
            </div>
          </div>
          <!-- Approved -->
          <router-link
            v-if="hteStore.getNumberOfApprovedRequest"
            :to="{ name: 'VisitRequest' }"
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfApprovedRequest === 0,
              'bg-red-500 text-gray-50': hteStore.getNumberOfApprovedRequest != 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfApprovedRequest }}
                </div>
                <div>Accepted</div>
              </div>
            </div>
          </router-link>
          <div
            v-else
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfApprovedRequest === 0,
              'bg-red-500 text-gray-50': hteStore.getNumberOfApprovedRequest != 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfApprovedRequest }}
                </div>
                <div>Accepted</div>
              </div>
            </div>
          </div>
          <!-- Done -->
          <router-link
            v-if="hteStore.getNumberOfDoneRequest"
            :to="{ name: 'VisitRequest' }"
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfDoneRequest === 0,
              'bg-green-500 text-gray-50': hteStore.getNumberOfDoneRequest != 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfDoneRequest }}
                </div>
                <div>Done</div>
              </div>
            </div>
          </router-link>
          <div
            v-else
            :class="{
              'bg-white text-gray-900': hteStore.getNumberOfDoneRequest === 0,
              'bg-green-500 text-gray-50': hteStore.getNumberOfDoneRequest != 0,
            }"
            class="self-end p-5 rounded shadow-sm"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div class="text-2xl font-bold">
                  {{ hteStore.getNumberOfDoneRequest }}
                </div>
                <div>Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-3/6 p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 capitalize">Announcements</h1>
        </header>
        <section>
          <ul class="flex flex-col h-screen gap-3 p-2 overflow-auto rounded shadow-sm">
            <p v-if="adminUserStore.announcementList.length === 0">No announcement yet</p>

            <AnnouncementItem
              v-for="data in adminUserStore.announcementList"
              :key="data.id"
              :title="data.title"
              :description="data.description"
              :author="data.author"
              :date="data.date"
              :role="data.role"
            />
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import AnnouncementItem from "../AnnouncementItem.vue";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useHteStore } from "@/stores/HteStore";
import { onMounted } from "vue";
const hteStore = useHteStore();
const adminUserStore = useAdminUserStore();

onMounted(async () => {
  await hteStore.fetchInternships();
  await hteStore.fetchApplicantList();
  await hteStore.fetchApplicantAccepted();
  await hteStore.getOnlineInterns();
  await hteStore.fetchVisitRequests();
  await adminUserStore.fetchAnnouncement();
});
</script>
