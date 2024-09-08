import { useRouter } from "vue-router";
import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useHteStore = defineStore("hte", () => {
  const router = useRouter();
  const internshipList = ref([]);
  const requestList = ref([]);
  const applicantList = ref([]);
  const applicantItemList = ref([]);
  const pendingApplicantList = ref([]);
  const jobName = ref("");
  const datePosted = ref("");
  const applicantRequirements = ref([]);
  const acceptedApplicantsList = ref([]);
  const approvedApplicantsList = ref([]);
  const onlineInternList = ref([]);
  const onlineLocationList = ref([]);
  const hteLocationDefault = reactive({
    lat: "",
    lng: "",
  });

  const internshipData = reactive({
    id: "",
    title: "",
    status: "",
    slots: "",
    requirements: "",
    location: "",
  });

  //#region CRUD for Internships listing

  const fetchInternships = async () => {
    try {
      const response = await apiClient.get(`/hte/list`);
      console.log(response);
      internshipList.value = response.data.content;
      hteLocationDefault.lat = 14.928082275482192;
      hteLocationDefault.lng = 120.89439798465614;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleInternships = async (jobId) => {
    try {
      const response = await apiClient.get(`/hte/list/applicants/${jobId}`);
      console.log(response);
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
      applicantList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchApplicantAccepted = async () => {
    try {
      const response = await apiClient.get(`/hte/applicants/accepted`);
      console.log(response);
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
      router.push({ name: "hte_dashboard" });
    } catch (err) {
      console.log(err.response.data.content);
      alert(err.response.data.content);
      router.push({ name: "ApplicantsList" });
    }
  };
  const rejectInternshipApplication = async (applicationId) => {
    try {
      const response = await apiClient.patch(
        `/hte/application/${applicationId}/reject`
      );

      console.log(response);
      // router.push({ name: "hte_dashboard" });
    } catch (err) {
      console.log(err);
      // alert(err.response.data.content)
      // router.push({ name: "ApplicantsList" });
    }
  };
  //#endregion

  const getOnlineInterns = async () => {
    try {
      const response = await apiClient.get(`/hte/internship/online`);
      console.log(response.data.content);
      onlineInternList.value = response.data.content;
      if (onlineInternList.value.length > 0) {
        onlineInternList.value.forEach((element) => {
          onlineLocationList.value.push(element.currentLocation);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getListingItem = async (id) => {
    try {
      const response = await apiClient.get(`/hte/list/${id}`);
      console.log(response.data.content._id);
      internshipData.id = response.data.content._id;
      internshipData.title = response.data.content.title;
      internshipData.status = response.data.content.status;
      internshipData.slots = response.data.content.slots;
      internshipData.requirements = response.data.content.requirements;
      internshipData.location = response.data.content.location;
    } catch (err) {
      console.log(err);
    }
  };
  const updateListingItem = async () => {
    console.log(internshipData.id);

    const payload = {
      title: internshipData.title,
      requirements: internshipData.requirements,
      slots: internshipData.slots,
      status: internshipData.status,
      location: internshipData.location,
    };

    try {
      const response = await apiClient.patch(
        `/hte/list/${internshipData.id.toString()}`,
        payload
      );

      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchVisitRequests = async () => {
    try {
      const response = await apiClient.get(`/hte/requests`);
      console.log(response);
      requestList.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const acceptVisitRequests = async (requestId) => {
    try {
      const response = await apiClient.patch(`/hte/requests/${requestId}`);
      await fetchVisitRequests();
      alert("Accepted Succesfully");
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const rejectVisitRequests = async (requestId, payload) => {
    try {
      const response = await apiClient.patch(
        `/hte/requests/reject/${requestId}`,
        {
          hteRemarks: payload,
        }
      );
      await fetchVisitRequests();
      alert("Rejected Succesfully");
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const resetDeviceRestriction = async (internId) => {
    try {
      const response = await apiClient.patch(`/admin/resetdevice/${internId}`);
      console.log(response);
      await fetchApplicantAccepted()
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  // Computed
  const getNumberOfVisitPendingRequest = computed(() => {
    return requestList.value.filter(
      (item) =>
        item.status != "Accepted" &&
        item.status !== "Rejected" &&
        item.status !== "Done"
    ).length;
  });
  const getNumberOfListing = computed(() => {
    return internshipList.value.length;
  });
  const getNumberOfApplicants = computed(() => {
    return applicantItemList.value.length;
  });
  const getListOfInternApplication = computed(() => {
    return applicantList.value.filter(
      (item) =>
        item.status !== "Accepted" &&
        item.status !== "Rejected" &&
        item.status !== "Finished"
    );
  });
  const getListOfAcceptedInterns = computed(() => {
    return acceptedApplicantsList.value;
  });
  const getListOfAcceptedInternsSession = computed(() => {
    return acceptedApplicantsList.value.filter(
      (item) => item.sessionCode !== null
    );
  });
  // const getNumberOfAcceptedInterns = computed(() => {
  //   return acceptedApplicantsList.value.length;
  // });
  const getNumberOfPendingInterns = computed(() => {
    return applicantList.value.filter((item) => item.status === "Pending")
      .length;
  });
  const getNumberOfApprovedInterns = computed(() => {
    return applicantList.value.filter((item) => item.status === "Approved")
      .length;
  });
  const getNumberOfAcceptedInterns = computed(() => {
    return applicantList.value.filter((item) => item.status === "Accepted")
      .length;
  });
  const getNumberOfInternForEvaluation = computed(() => {
    return applicantList.value.filter((item) => item.status === "Finished")
      .length;
  });

  const getNumberOfApprovedRequest = computed(() => {
    return requestList.value.filter((item) => item.status === "Accepted")
      .length;
  });
  const getNumberOfDoneRequest = computed(() => {
    return requestList.value.filter((item) => item.status === "Done").length;
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
    hteLocationDefault,
    onlineLocationList,
    internshipData,
    getListingItem,
    updateListingItem,
    rejectInternshipApplication,
    fetchVisitRequests,
    requestList,
    acceptVisitRequests,
    rejectVisitRequests,
    getNumberOfVisitPendingRequest,
    getNumberOfApprovedRequest,
    getNumberOfDoneRequest,
    getNumberOfInternForEvaluation,
    getListOfAcceptedInternsSession,
    resetDeviceRestriction
  };
});
