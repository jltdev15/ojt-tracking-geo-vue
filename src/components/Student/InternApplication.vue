<template>
  <div>
    <header class="text-center">
      <h1 class="p-6 text-3xl font-bold">Internship Application Form</h1>
    </header>
    <form @submit.prevent="uploadFile" enctype="multipart/form-data">
      <div class="p-3 max-w-xl mx-auto">
        <header class="">
          <h2 class="text-xl font-bold flex items-center">
            Resume
            <span class="text-sm text-red-600 px-3 font-extralight">(required)</span>
          </h2>
          <p class="text-sm py-2 text-gray-500 font-extralight">
            Accepts only JPEG or PDF format(5MB Max size)
          </p>
        </header>
        <div class="py-1 mb-3 border">
          <input
            placeholder="Supporting documents"
            type="file"
            name="supporting_document"
            accept="application/pdf, image/jpeg, image/png"
            id="supporting_document"
            ref="fileInput "
            class="file-input file-input-bordered w-full max-w-3xl"
            @change="handleFileChange"
            required
          />
          <p v-if="isFileSizeExceed" class="p-1 text-red-800">
            Files size exceeded. Please upload other documents
          </p>
        </div>
        <header class="">
          <h2 class="text-xl font-bold flex items-center">
            Memorandum of Agreement
            <span class="text-sm text-gray-400 px-3 font-extralight">(optional)</span>
          </h2>
        </header>
        <div class="py-1 mb-3 border">
          <input
            type="file"
            name="supporting_document"
            accept="application/pdf, image/jpeg, image/png"
            id="supporting_document"
            ref="fileInput "
            class="file-input file-input-bordered w-full max-w-3xl"
            @change="handleFile2Change"
            required
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
          class="text-center flex items-center font-medium btn-outline btn mt-3 cursor-pointer hover:text-blue-600"
          >Browse Interships</router-link
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const internStore = useInternStore();
console.log(route.params.id);

const isFileSizeExceed = ref(false);
// Object that will hold the uploaded files
const applicationRequirements = reactive({
  resume: null,
  moa: null,
});

// Event for getting the file to be uploaded
const handleFileChange = (event) => {
  applicationRequirements.resume = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile2Change = (event) => {
  applicationRequirements.moa = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};

const uploadFile = async () => {
  if (applicationRequirements.resume || applicationRequirements.moa) {
    const formData = new FormData();
    formData.append("fileResume", applicationRequirements.resume);
    formData.append("fileMoa", applicationRequirements.moa);
  }
  console.log(formData);

  try {
    await internStore.applyInternship(route.params.id, formData);
    console.log("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped></style>
