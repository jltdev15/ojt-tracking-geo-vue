<template>
  <div>
    <header class="flex items-center justify-between p-3 bg-gray-50">
      <h1 class="text-3xl font-bold">Manage Settings</h1>
    </header>
    <section class="flex p-3 gap-9">
      <div class="w-3/6 shadow-md p-3">
        <p class="font-medium py-3 uppercase">Department List</p>
        <div class="flex items-center justify-between gap-3">
          <input
            v-model.trim="departmentName"
            type="text "
            class="input w-full"
            placeholder="New department"
          />
          <button @click="addDepartmentHandler" class="btn btn-primary">Add</button>
        </div>
        <div class="py-3">
          <ul>
            <p
              class="text-center font-medium"
              v-if="adminUserStore.departmentlist.length === 0"
            >
              No data found
            </p>
            <li
              v-else
              v-for="(item, index) in adminUserStore.departmentlist"
              :key="index"
              class="bg-gray-50 flex justify-between items-center gap-3 p-2"
            >
              <div class="w-full">
                <input
                  :disabled="updateEnabled !== index"
                  type="text"
                  class="w-full p-3"
                  v-model="item.name"
                />
              </div>

              <div class="flex items-center gap-3">
                <span
                  @click="toggleEdit(index, item.name, item._id)"
                  class="p-2 bg-primary text-gray-50 cursor-pointer"
                >
                  {{ updateEnabled === index ? "Save" : "Edit" }}</span
                >

                <span
                  @click="adminUserStore.deleteDepartmentList(item._id)"
                  class="p-2 bg-red-600 text-gray-50 cursor-pointer"
                  >Remove</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-3/6 shadow-md p-3">
        <p class="font-medium py-3 uppercase">User Roles</p>
        <span></span>
        <div class="flex items-center justify-between gap-3">
          <input type="text " class="input w-full" placeholder="New role" />
          <button class="btn btn-primary">Add</button>
        </div>
        <div class="py-3">
          <ul>
            <li class="bg-gray-50 flex justify-between items-center p-2">
              Admin

              <div class="flex items-center gap-3">
                <span class="p-2">Edit</span>
                <span class="p-2">Remove</span>
              </div>
            </li>
            <li class="bg-gray-50 flex justify-between items-center p-2">
              Coordinator

              <div class="flex items-center gap-3">
                <span class="p-2">Edit</span>
                <span class="p-2">Remove</span>
              </div>
            </li>
            <li class="bg-gray-50 flex justify-between items-center p-2">
              HTE

              <div class="flex items-center gap-3">
                <span class="p-2">Edit</span>
                <span class="p-2">Remove</span>
              </div>
            </li>
            <li class="bg-gray-50 flex justify-between items-center p-2">
              Intern

              <div class="flex items-center gap-3">
                <span class="p-2">Edit</span>
                <span class="p-2">Remove</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAdminUserStore } from "@/stores/AdminUserStore";
import { onMounted, ref } from "vue";
const adminUserStore = useAdminUserStore();

const departmentName = ref("");
const updatedName = ref(null);
const updateEnabled = ref(null);
const addDepartmentHandler = async () => {
  if (departmentName.value === "") {
    return alert("Empty field, Please fill up Department name");
  }
  await adminUserStore.addDepartmentList({ name: departmentName.value });
  departmentName.value = "";
};
const toggleEdit = (index, payload, id) => {
  if (updateEnabled.value === index) {
    adminUserStore.updateDepartmentList(id, { name: payload });
    updateEnabled.value = null;
  } else {
    updateEnabled.value = index;
  }
};
const updateHandler = () => {
  if (updatedName.value === "") {
    return alert("Update Error, Please dont submit with empty field");
  }
};

adminUserStore.fetchDepartmentList();
onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
