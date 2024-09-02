<template>
  <div>
    <div class="p-6 text-sm breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'admin_dashboard' }">Admin Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'manage_users' }">Users management</router-link>
        </li>
        <li>
          <router-link class="text-red-800" :to="{ name: 'UpdateUser' }"
            >Update user</router-link
          >
        </li>
      </ul>
    </div>
    <header class="flex items-center justify-between px-6 bg-gray-200">
      <h1 class="text-3xl">
        Update <span class="font-bold">Information</span> {{ userStore.currentRole }}
      </h1>
    </header>
    <section class="grid max-w-5xl grid-cols-2 gap-6 p-3">
      <div class="flex flex-col gap-3 p-3 rounded-md shadow-md">
        <h2 class="p-3 text-2xl bg-red-800 text-gray-50">Profile Information</h2>
        <!-- Coord -->
        <section v-if="userStore.currentRole === 'Coordinator'" class="">
          <label for="">Email</label>
          <input
            v-model="userStore.updateInfo.email"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <label for="">Full Name</label>
          <input
            v-model="userStore.updateInfo.fullName"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <label for="">Contact Number</label>
          <input
            v-model="userStore.updateInfo.contactNumber"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <div class="py-3">
            <label for="">Select Department</label>
            <select
              @change="handleSelectDepartment"
              v-model="userStore.updateInfo.department"
              class="w-full py-3 select select-bordered"
            >
              <option selected disabled value="">Select department</option>

              <option
                v-for="item in userStore.departmentlist"
                :key="item._id"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <button @click="updateHandlerCoor" class="btn btn-primary btn-block">
            Update
          </button>
        </section>
        <!-- HTE -->
        <section v-if="userStore.currentRole === 'HTE'" class="">
          <label for="">Company Name</label>
          <input
            v-model="userStore.updateInfo.companyName"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />

          <label class="block" for="">Company Email</label>
          <input
            v-model="userStore.updateInfo.companyEmail"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <label class="block" for="">Company Address</label>
          <input
            v-model="userStore.updateInfo.companyAddress"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />

          <label for="">Contact Number</label>
          <input
            v-model="userStore.updateInfo.companyContact"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <p>Please provide exact map coordinates</p>
          <label class="flex items-center gap-2 input input-bordered">
            <input
              v-model="userStore.updateInfo.mapLocation.lat"
              type="number"
              class="grow"
              placeholder="Latitude"
            />
            <input
              v-model="userStore.updateInfo.mapLocation.lng"
              type="number"
              class="grow"
              placeholder="Longtitude"
            />
          </label>
          <label class="block py-3 text-center" for=""
            >Has Memorandum of Agreement?</label
          >
          <div class="flex justify-center gap-3 pb-4 join">
            <input
              class="join-item btn"
              type="radio"
              name="options"
              value="true"
              aria-label="Yes"
              v-model="userStore.updateInfo.hasMoa"
              @change="onChange"
            />
            <input
              class="join-item btn"
              type="radio"
              name="options"
              value="false"
              aria-label="No"
              v-model="userStore.updateInfo.hasMoa"
              @change="onChange"
            />
          </div>

          <button @click="updateHandlerHTE" class="btn btn-primary btn-block">
            Update
          </button>
        </section>
        <!-- Intern Information -->
        <section v-if="userStore.currentRole === 'Intern'" class="">
          <label for="">Intern Name</label>
          <input
            v-model="userStore.updateInfo.internName"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />

          <label class="block" for="">Intern Email</label>
          <input
            v-model="userStore.updateInfo.internEmail"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <label class="block" for="">Required Hours</label>
          <input
            v-model="userStore.updateInfo.requiredHours"
            type="number"
            placeholder="Type here"
            class="w-full input input-bordered"
          />

          <label for="">Contact Number</label>
          <input
            v-model="userStore.updateInfo.internContact"
            type="text"
            placeholder="Type here"
            class="w-full input input-bordered"
          />
          <div class="py-3">
            <label for="">Select Department</label>
            <select
              @change="handleSelectDepartment"
              v-model="userStore.updateInfo.internDepartment"
              class="w-full py-3 select select-bordered"
            >
              <option selected disabled value="">Select department</option>

              <option
                v-for="item in userStore.departmentlist"
                :key="item._id"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <button @click="updateHandlerIntern" class="py-3 btn btn-primary btn-block">
            Update
          </button>
        </section>
      </div>
      <!-- <div class="flex flex-col gap-3 p-3 rounded-md shadow-md">
        <h2 class="p-3 text-2xl bg-red-800 text-gray-50">Manage Password</h2>
        <label for="">Username</label>
        <input
          v-model="userStore.updateInfo.username"
          type="text"
          placeholder="Type here"
          class="w-full input input-bordered"
        />
        <button class="btn btn-primary text-gray-50">Reset</button>
      </div> -->
    </section>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, reactive } from "vue";
const userStore = useAdminUserStore();
const route = useRoute();
const router = useRouter();
const updateHandlerCoor = async () => {
  const response = await userStore.updateInformationCoor();
  alert(response.data.message);
  router.push({ name: "manage_users" });
};
const updateHandlerHTE = async () => {
  await userStore.updateInformationHTE();
  // alert(response.data.message);
  router.push({ name: "manage_users" });
};
const updateHandlerIntern = async () => {
  const response = await userStore.updateInformationIntern();
  console.log(response);
  alert(response.data.message);
  router.push({ name: "manage_users" });
};

onMounted(async () => {
  await userStore.fetchUpdateInformation(route.params.id);
  await userStore.fetchDepartmentList();
});
</script>

<style lang="scss" scoped></style>
