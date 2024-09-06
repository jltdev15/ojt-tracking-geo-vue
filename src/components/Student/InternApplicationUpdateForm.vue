<template>
    <div>
        <header class="text-center">
            <h1 class="p-6 text-3xl font-bold">Internship Application Form</h1>
        </header>
        <form @submit.prevent="uploadFile" enctype="multipart/form-data">
            <div class="max-w-xl p-3 mx-auto">
                <!-- REsumen -->
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
                    <input placeholder="Supporting documents" type="file" name="files"
                        accept="application/pdf, image/jpeg, image/png" id="supporting_document"
                        :ref="internStore.applicationInfo.resume"
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFileChange" required />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>
                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.resume">Uploaded file : </p>
                        <a :href="internStore.applicationInfo.resumePath" target="_blank" class="text-red-800"
                            v-if="internStore.applicationInfo.resume">
                            View resume
                        </a>
                    </div>


                </div>
                <!-- Parent Consent -->
                <header class="">
                    <h2 class="flex items-center text-xl font-bold">
                        Parent Consent
                        <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
                    </h2>
                </header>
                <div class="py-1 mb-3 border">
                    <input type="file" name="files" accept="application/pdf, image/jpeg, image/png"
                        id="supporting_document" ref="fileInput "
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFile2Change" />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>

                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.parent_consent">Uploaded file</p>
                        <a :href="internStore.applicationInfo.parent_consentPath" target="_blank" class="text-red-800"
                            v-if="internStore.applicationInfo.parent_consent">View consent
                        </a>
                    </div>
                </div>
                <!-- Intern Endorsement Form -->
                <header class="">
                    <h2 class="flex items-center text-xl font-bold">
                        Intern Endorsement Form
                        <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
                    </h2>
                </header>
                <div class="py-1 mb-3 border">
                    <input type="file" name="files" accept="application/pdf, image/jpeg, image/png"
                        id="supporting_document" ref="fileInput "
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFile3Change" />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>

                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.internEndorsement">Uploaded file</p>
                        <a :href="internStore.applicationInfo.internEndorsementPath" target="_blank"
                            class="text-red-800" v-if="internStore.applicationInfo.internEndorsement">
                            View Intern Endorsement Form
                        </a>
                    </div>
                </div>
                <!-- MOA HTE -->
                <header class="">
                    <h2 class="flex items-center text-xl font-bold">
                        MOA HTE
                        <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
                    </h2>
                </header>
                <div class="py-1 mb-3 border">
                    <input type="file" name="files" accept="application/pdf, image/jpeg, image/png"
                        id="supporting_document" ref="fileInput "
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFile4Change" />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>
                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.moa">Uploaded file</p>
                        <a :href="internStore.applicationInfo.moaPath" target="_blank" class="text-red-800"
                            v-if="internStore.applicationInfo.moa">
                            View MOA HTE
                        </a>
                    </div>
                </div>
                <!-- First -->
                <header class="">
                    <h2 class="flex items-center text-xl font-bold">
                        First Endorsement Form
                        <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
                    </h2>
                </header>
                <div class="py-1 mb-3 border">
                    <input type="file" name="files" accept="application/pdf, image/jpeg, image/png"
                        id="supporting_document" ref="fileInput "
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFile5Change" />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>
                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.firstEndorsement">Uploaded file</p>
                        <a :href="internStore.applicationInfo.firstEndorsementPath" target="_blank" class="text-red-800"
                            v-if="internStore.applicationInfo.firstEndorsement">
                            View First Endorsement Form
                        </a>
                    </div>
                </div>
                <!-- Certification -->
                <header class="">
                    <h2 class="flex items-center text-xl font-bold">
                        Certification Form
                        <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
                    </h2>
                </header>
                <div class="py-1 mb-3 border">
                    <input type="file" name="files" accept="application/pdf, image/jpeg, image/png"
                        id="supporting_document" ref="fileInput "
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFile6Change" />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>
                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.certificationFile">Uploaded file</p>
                        <a :href="internStore.applicationInfo.certificationPath" target="_blank" class="text-red-800"
                            v-if="internStore.applicationInfo.certificationFile">
                            View Certification Form
                        </a>
                    </div>
                </div>
                <!-- Internship agreement -->
                <header class="">
                    <h2 class="flex items-center text-xl font-bold">
                        Internship Agreement
                        <span class="px-3 text-sm text-gray-400 font-extralight">(optional)</span>
                    </h2>
                </header>
                <div class="py-1 mb-3 border">
                    <input type="file" name="files" accept="application/pdf, image/jpeg, image/png"
                        id="supporting_document" ref="fileInput "
                        class="w-full max-w-3xl file-input file-input-bordered" @change="handleFile7Change" />
                    <p v-if="isFileSizeExceed" class="p-1 text-red-800">
                        Files size exceeded. Please upload other documents
                    </p>
                    <div class="flex gap-3">
                        <p v-if="internStore.applicationInfo.internshipAgreement">Uploaded file</p>
                        <a :href="internStore.applicationInfo.internshipAgreementPath" target="_blank"
                            class="text-red-800" v-if="internStore.applicationInfo.internshipAgreement">
                            View Certification Form
                        </a>
                    </div>
                </div>

                <div>
                    <button class="btn btn-primary btn-block">Update Application</button>
                </div>
                <router-link to="/student/dashboard/internships"
                    class="flex items-center mt-3 font-medium text-center cursor-pointer btn-outline btn hover:text-blue-600">Browse
                    Interships</router-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useInternStore } from "@/stores/InternStore";
import { onMounted, reactive, ref } from "vue";
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

onMounted(async () => {
    const response = await internStore.fetchApplicationInformation(route.params.id)
    console.log(response);


})
</script>

<style lang="scss" scoped></style>
