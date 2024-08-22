<template>
  <div>
    <header class="text-center">
      <h1 class="p-6 text-3xl font-bold">Internship Application Form</h1>
    </header>
    <form @submit.prevent="uploadFile" enctype="multipart/form-data">
      <div class="max-w-xl p-3 mx-auto">
        <header class="">
          <h2 class="flex items-center text-xl font-bold">
            Resume
            <span class="px-3 text-sm text-red-600 font-extralight">(required)</span>
          </h2>
          <p class="py-2 text-sm text-gray-500 font-extralight">
            Accepts only JPEG or PDF format(5MB Max size)
          </p>
        </header>
        <div class="py-1 mb-3 border">
          <input
            placeholder="Supporting documents"
            type="file"
            name="files"
            accept="application/pdf, image/jpeg, image/png"
            id="supporting_document"
            ref="fileInput "
            class="w-full max-w-3xl file-input file-input-bordered"
            @change="handleFileChange"
            required
          />
          <p v-if="isFileSizeExceed" class="p-1 text-red-800">
            Files size exceeded. Please upload other documents
          </p>
        </div>
        <header class="">
          <h2 class="flex items-center text-xl font-bold">
            Memorandum of Agreement
            <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
          </h2>
        </header>
        <div class="py-1 mb-3 border">
          <input
            type="file"
            name="files"
            accept="application/pdf, image/jpeg, image/png"
            id="supporting_document"
            ref="fileInput "
            class="w-full max-w-3xl file-input file-input-bordered"
            @change="handleFile2Change"
          />
          <p v-if="isFileSizeExceed" class="p-1 text-red-800">
            Files size exceeded. Please upload other documents
          </p>
        </div>
        <div>
          <button class="btn btn-primary btn-block">Submit Application</button>
        </div>
        <router-link
          to="/student/dashboard/internships"
          class="flex items-center mt-3 font-medium text-center cursor-pointer btn-outline btn hover:text-blue-600"
          >Browse Interships</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const internStore = useInternStore();
console.log(route.params.id);

const isFileSizeExceed = ref(false);
// Object that will hold the uploaded files
const fileResume = ref(null);
const fileMoa = ref(null);

// Event for getting the file to be uploaded
const handleFileChange = (event) => {
  fileResume.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile2Change = (event) => {
  fileMoa.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};

const uploadFile = async () => {
  const formData = new FormData();
  console.log(formData);
  formData.append("files", fileResume.value);
  formData.append("files", fileMoa.value);

  console.log(formData);
  try {
    await internStore.applyInternship(route.params.id, formData);
    router.push({ name: "ApplicationStatus" });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped></style>
