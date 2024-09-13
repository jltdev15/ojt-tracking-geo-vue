<template>
  <div>
    <header class="">
      <h1 class="md:p-6 px-6 pt-6 text-xl md:text-3xl font-bold">
        Internship Application Form
      </h1>
      <p class="px-6 text-sm text-gray-500 font-extralight">
        Accepts only JPEG or PDF format(5MB Max size)
      </p>
    </header>

    <form @submit.prevent="uploadFile" enctype="multipart/form-data">
      <div class="max-w-5xl p-6 grid md:grid-cols-2 gap-3">
        <div>
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              Resume
              <span class="px-3 text-sm text-red-600 font-extralight">(required)</span>
            </h2>
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
          <!-- Parent Consent -->
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              Parent Consent
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
          <!-- Intern Endorsement Form -->
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              Intern Endorsement Form
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
              @change="handleFile3Change"
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
          <!-- MOA HTE -->
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              MOA HTE
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
              @change="handleFile4Change"
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
        </div>
        <div>
          <!-- First -->
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              First Endorsement Form
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
              @change="handleFile5Change"
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
          <!-- Certification -->
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              Certification Form
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
              @change="handleFile6Change"
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
          <!-- Internship agreement -->
          <header class="">
            <h2 class="flex items-center text-xl font-bold">
              Internship Agreement
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
              @change="handleFile7Change"
            />
            <p v-if="isFileSizeExceed" class="p-1 text-red-800">
              Files size exceeded. Please upload other documents
            </p>
          </div>
        </div>
      </div>
      <div
        class="md:max-w-5xl p-6 gap-3 justify-between md:justify-end flex items-center"
      >
        <router-link
          to="/student/dashboard/internships"
          class="flex items-center font-medium text-center cursor-pointer btn-outline btn hover:text-blue-600"
          >Browse Interships</router-link
        >
        <div>
          <button class="btn btn-primary btn-block">Submit Application</button>
        </div>
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
const fileParentConsent = ref(null);
const fileInternEndorsementForm = ref(null);
const fileMoa = ref(null);
const fileFirstEndorsement = ref(null);
const fileCertificationForm = ref(null);
const fileInternshipAgreement = ref(null);

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
  fileParentConsent.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile3Change = (event) => {
  fileInternEndorsementForm.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile4Change = (event) => {
  fileMoa.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile5Change = (event) => {
  fileFirstEndorsement.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile6Change = (event) => {
  fileCertificationForm.value = event.target.files[0];
  const file = event.target.files[0];
  const maxSize = 5000 * 5000;
  if (file && file.size > maxSize) {
    return (isFileSizeExceed.value = true);
  }
  isFileSizeExceed.value = false;
};
const handleFile7Change = (event) => {
  fileInternshipAgreement.value = event.target.files[0];
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
  formData.append("files", fileParentConsent.value);
  formData.append("files", fileFirstEndorsement.value);
  formData.append("files", fileCertificationForm.value);
  formData.append("files", fileInternshipAgreement.value);
  formData.append("files", fileInternEndorsementForm.value);
  try {
    await internStore.applyInternship(route.params.id, formData);
    router.push({ name: "ApplicationStatus" });
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped></style>
