import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useHteStore = defineStore("hte", () => {
  const internshipList = ref([]);
  const applicantList = ref([]);
  const applicantItemList = ref([]);
  const pendingApplicantList = ref([]);
  const jobName = ref("");
  const datePosted = ref("");
  const applicantRequirements = ref([]);
  const acceptedApplicantsList = ref([]);
  const approvedApplicantsList = ref([]);
  const onlineInternList = ref([])
  const hteLocationDefault = reactive({
    lat:'',
    long:'',
  })

  //#region CRUD for Internships listing

  const fetchInternships = async () => {
    try {
      const response = await apiClient.get(`/hte/list`);
      console.log(response);
      internshipList.value = response.data.content;
      hteLocationDefault.lat = 14.8333;
      hteLocationDefault.long = 120.8833;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleInternships = async (jobId) => {
    try {
      const response = await apiClient.get(`/hte/list/${jobId}`);
      console.log(response.data.content);
      jobName.value = response.data.content.jobTitle;
      datePosted.value = response.data.content.createdAt;
      applicantItemList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const postInternship = async (payload) => {
    try {
      const response = await apiClient.post(`/hte/create/`, payload);
      console.log(response);
      await fetchInternships();
    } catch (err) {
      console.log(err);
    }
  };
  const removeInternship = async (id) => {
    console.log(id);

    try {
      const response = await apiClient.delete(`/hte/delete/${id}`);
      console.log(response);
      await fetchInternships();
    } catch (err) {
      console.log(err);
    }
  };
  //#endregion

  // Get list of applicant on specific job
  //#region
  const fetchApplicantList = async () => {
    try {
      const response = await apiClient.get(`/hte/applicants/list`);
      console.log(response.data.content);
      applicantList.value = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchApplicantAccepted = async () => {
    try {
      const response = await apiClient.get(`/hte/applicants/accepted`);
      console.log(response.data.content);
      acceptedApplicantsList.value = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  // Method before accepting interns
  const fetchSingleApplication = async (jobId, applicantId) => {
    try {
      const response = await apiClient.get(
        `/hte/applicants/${jobId}/intern/${applicantId}`
      );
      console.log(response.data.content);
      applicantRequirements.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const acceptIntershipApplication = async (applicationId) => {
    console.log(applicationId);
    try {
      const response = await apiClient.put(
        `/hte/application/${applicationId}/accept`
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  //#endregion

  const getOnlineInterns = async () => {
    try {
      const response = await apiClient.get(`/hte/internship/online`);
      console.log(response.data.content);
      onlineInternList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  }
  // Computed

  const getNumberOfListing = computed(() => {
    return internshipList.value.length;
  });
  const getNumberOfApplicants = computed(() => {
    return applicantItemList.value.length;
  });
  const getListOfInternApplication = computed(() => {
    return applicantList.value.filter((item) => item.status !== "Accepted");
  });
  const getListOfAcceptedInterns = computed(() => {
    return acceptedApplicantsList.value;
  });
  const getNumberOfAcceptedInterns = computed(() => {
    return acceptedApplicantsList.value.length;
  });
  const getNumberOfPendingInterns = computed(() => {
    return applicantList.value.filter((item) => item.status === "Pending")
      .length;
  });
  const getNumberOfApprovedInterns = computed(() => {
    return applicantList.value.filter((item) => item.status === "Approved")
      .length;
  });

  return {
    fetchInternships,
    internshipList,
    postInternship,
    removeInternship,
    applicantItemList,
    fetchSingleInternships,
    jobName,
    datePosted,
    getNumberOfApplicants,
    fetchSingleApplication,
    applicantRequirements,
    acceptIntershipApplication,
    getNumberOfListing,
    acceptedApplicantsList,
    getNumberOfAcceptedInterns,
    pendingApplicantList,
    getNumberOfPendingInterns,
    fetchApplicantList,
    applicantList,
    getNumberOfApprovedInterns,
    approvedApplicantsList,
    getListOfAcceptedInterns,
    getListOfInternApplication,
    fetchApplicantAccepted,
    getOnlineInterns,
    onlineInternList,
    hteLocationDefault
  };
});
