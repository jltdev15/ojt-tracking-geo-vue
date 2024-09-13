<template>
  <div
    v-for="(item, index) in internStore.internshipLists"
    :key="index"
    class="shadow-xl card card-compact bg-base-100 w-full md:w-96"
  >
    <div class="flex items-center justify-between p-2 text-xs text-right">
      <p class="px-3 text-base bg-gray-400 rounded text-gray-50">Internship</p>
      <p
        v-if="item.hte.moaAttachement"
        class="inline-block px-6 py-3 bg-green-600 text-gray-50"
      >
        has Moa
      </p>
      <p v-else class="inline-block px-6 py-3 bg-red-600 text-gray-50">No MOA</p>
    </div>
    <div class="flex justify-between px-6 pt-6 text-xs font-bold">
      <router-link :to="{ name: 'HteInformation', params: { id: item.hte._id } }">{{
        item.hte.fullName
      }}</router-link>
      <!-- <router-link>{{ item.hte.name }}</router-link> -->
    </div>

    <div class="px-6 pb-4">
      <div class="text-xl font-bold">{{ item.title }}</div>
      <p class="text-xs text-gray-700">
        {{ item.requirements }}
      </p>
    </div>
    <div class="flex justify-between px-6 py-3 font-bold"></div>
    <div class="h-1 px-3 mb-0 divider"></div>
    <div class="flex items-center justify-between p-3">
      <div class="flex flex-col justify-between px-6 py-4">
        <p class="text-base font-bold">Slots {{ item.slots }}</p>
        <p class="text-sm font-medium text-gray-400">{{ item.location }}</p>
      </div>
      <button
        :disabled="authStore.isInternReady"
        class="btn btn-primary rounded-xl"
        @click="handleApply(item._id)"
      >
        Apply now
      </button>
    </div>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
import { useRouter } from "vue-router";
const internStore = useInternStore();
const emit = defineEmits([""]);
const router = useRouter();

const handleApply = async (jobId) => {
  console.log(jobId);

  router.push({ name: "InternApplication", params: { id: jobId } });
};

// const props = defineProps(['datePosted','status','slots','location','description','title','companyName'])
</script>

<style lang="scss" scoped></style>
