<template>
  <div class="p-3">
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Dashboard</h1>
    </header>
    <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div class="container max-w-6xl p-5">
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">Internships</h1>
        </header>
        <div class="grid gap-7 grid-cols-2 lg:grid-cols-3">
          <div class="p-5 bg-gray-500 rounded shadow-sm">
            <router-link
              v-if="coorStore.getNumberOfInterns !== 0"
              :to="{ name: 'InternDepartmentList' }"
              class="flex items-center space-x-4 space-y-2"
            >
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    enable-background="new 0 0 24 24"
                    id="Layer_1"
                    version="1.0"
                    viewBox="0 0 24 24"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        d="M9,9c0-1.7,1.3-3,3-3s3,1.3,3,3c0,1.7-1.3,3-3,3S9,10.7,9,9z M12,14c-4.6,0-6,3.3-6,3.3V19h12v-1.7C18,17.3,16.6,14,12,14z   "
                      />
                    </g>
                    <g>
                      <g>
                        <circle cx="18.5" cy="8.5" r="2.5" />
                      </g>
                      <g>
                        <path
                          d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <circle cx="18.5" cy="8.5" r="2.5" />
                      </g>
                      <g>
                        <path
                          d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <circle cx="5.5" cy="8.5" r="2.5" />
                      </g>
                      <g>
                        <path
                          d="M5.5,13c1.2,0,2.1,0.3,2.8,0.8c-2.3,1.1-3.2,3-3.2,3.2l0,0.1H1v-1.3C1,15.7,2.1,13,5.5,13z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-100">
                  {{ coorStore.getNumberOfInterns }}
                </div>
                <div class="text-gray-100">Interns</div>
              </div>
            </router-link>
            <div
              v-if="coorStore.getNumberOfInterns === 0"
              class="flex items-center space-x-4 space-y-2"
            >
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    enable-background="new 0 0 24 24"
                    id="Layer_1"
                    version="1.0"
                    viewBox="0 0 24 24"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        d="M9,9c0-1.7,1.3-3,3-3s3,1.3,3,3c0,1.7-1.3,3-3,3S9,10.7,9,9z M12,14c-4.6,0-6,3.3-6,3.3V19h12v-1.7C18,17.3,16.6,14,12,14z   "
                      />
                    </g>
                    <g>
                      <g>
                        <circle cx="18.5" cy="8.5" r="2.5" />
                      </g>
                      <g>
                        <path
                          d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <circle cx="18.5" cy="8.5" r="2.5" />
                      </g>
                      <g>
                        <path
                          d="M18.5,13c-1.2,0-2.1,0.3-2.8,0.8c2.3,1.1,3.2,3,3.2,3.2l0,0.1H23v-1.3C23,15.7,21.9,13,18.5,13z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <circle cx="5.5" cy="8.5" r="2.5" />
                      </g>
                      <g>
                        <path
                          d="M5.5,13c1.2,0,2.1,0.3,2.8,0.8c-2.3,1.1-3.2,3-3.2,3.2l0,0.1H1v-1.3C1,15.7,2.1,13,5.5,13z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ coorStore.getNumberOfInterns }}
                </div>
                <div class="text-gray-400">Interns</div>
              </div>
            </div>
          </div>

          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    height="32px"
                    id="Layer_1"
                    style="enable-background: new 0 0 50 50"
                    version="1.1"
                    viewBox="0 0 50 50"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="Layer_1_1_">
                      <path
                        d="M11,49h4h8h4h8h4h8h2v-2h-2V1h-8v46h-4V11h-8v36h-4V21h-8v26h-4V31H3v16H1v2h2H11z M41,3h4v44h-4V3z M29,13h4v34h-4V13z    M17,23h4v24h-4V23z M5,33h4v14H5V33z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ coorStore.getNumberOfInternsDeployed }}
                </div>
                <div class="text-gray-400">Deployed</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center md:w-12 md:h-12 h-6 w-6 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    height="32px"
                    id="Layer_1"
                    style="enable-background: new 0 0 50 50"
                    version="1.1"
                    viewBox="0 0 50 50"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="Layer_1_1_">
                      <path
                        d="M11,49h4h8h4h8h4h8h2v-2h-2V1h-8v46h-4V11h-8v36h-4V21h-8v26h-4V31H3v16H1v2h2H11z M41,3h4v44h-4V3z M29,13h4v34h-4V13z    M17,23h4v24h-4V23z M5,33h4v14H5V33z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ coorStore.getNumberOfStudentEvaluated }}
                </div>
                <div class="text-gray-400">Evaluated</div>
              </div>
            </div>
          </div>
        </div>
        <header class="py-3">
          <h1 class="text-xl font-semibold text-gray-400 uppercase">HTE Requests</h1>
        </header>
        <div class="grid gap-7 grid-cols-2 lg:grid-cols-4">
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  style="fill: #fa5252"
                >
                  <path
                    d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M25,28c-0.462,0-0.895-0.113-1.286-0.3 l-6.007,6.007C17.512,33.902,17.256,34,17,34s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6.007-6.007 C22.113,25.895,22,25.462,22,25c0-1.304,0.837-2.403,2-2.816V8c0-0.553,0.447-1,1-1s1,0.447,1,1v14.184c1.163,0.413,2,1.512,2,2.816 C28,26.657,26.657,28,25,28z"
                  ></path>
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ coorStore.getNumberOfRequestPending }}
                </div>
                <div class="text-gray-400">Pending</div>
              </div>
            </div>
          </div>
          <div
            class="p-5 rounded shadow-sm"
            :class="{
              'bg-red-600 text-gray-50': coorStore.getNumberOfRequestRejected != 0,
              'bg-white text-gray-900': coorStore.getNumberOfRequestRejected === 0,
            }"
          >
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center md:w-12 md:h-12 h-6 w-6 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    style="fill: #fa5252"
                  >
                    <path
                      d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold">
                  {{ coorStore.getNumberOfRequestRejected }}
                </div>
                <div class="">Rejected</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center md:w-12 md:h-12 h-6 w-6 rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 1)"
                  >
                    <path
                      d="M19.071 4.929c-3.899-3.898-10.243-3.898-14.143 0-3.898 3.899-3.898 10.244 0 14.143 3.899 3.898 10.243 3.898 14.143 0 3.899-3.9 3.899-10.244 0-14.143zm-3.536 10.607-2.828-2.829-3.535 3.536-1.414-1.414 3.535-3.536-2.828-2.829h7.07v7.072z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ coorStore.getNumberOfRequestAccepted }}
                </div>
                <div class="text-gray-400 text-sm">For visitation</div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white rounded shadow-sm">
            <div class="flex items-center space-x-4 space-y-2">
              <div>
                <div
                  class="flex items-center justify-center md:w-12 md:h-12 h-6 w-6rounded-full bg-cyan-50 text-cyan-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3.414 13.778 2 15.192l4.949 2.121 2.122 4.95 1.414-1.414-.707-3.536L13.091 14l3.61 7.704 1.339-1.339-1.19-10.123 2.828-2.829a2 2 0 1 0-2.828-2.828l-2.903 2.903L3.824 6.297 2.559 7.563l7.644 3.67-3.253 3.253-3.536-.708z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900">
                  {{ coorStore.getNumberOfRequestDone }}
                </div>
                <div class="text-gray-400">Visited</div>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="md:w-3/6 p-5">
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
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { useCoorStore } from "@/stores/CoorStore";
const coorStore = useCoorStore();
const adminUserStore = useAdminUserStore();
onMounted(async () => {
  document.title = "OJT Tracker | Dashboard";
  await coorStore.fetchInternLists();
  await coorStore.fetchHTELists();
  await adminUserStore.fetchInterns();
  await coorStore.fetchRequestVisitation();
  await coorStore.getInternEvaluation();
  await adminUserStore.fetchAnnouncement();
  // await authStore.checkAuth();
  // await adminUserStore.fetchUsers();
  // await adminUserStore.fetchAllUsers();
});
</script>
