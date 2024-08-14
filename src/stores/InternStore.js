import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useInternStore = defineStore("intern", () => {
  const internshipLists = ref([]);
  const applicationLists = ref([])
  const requiredHours = ref(null)
  const fetchInternshipLists = async () => {
    try {
      const response = await apiClient.get(`/intern/vacancy`);
      internshipLists.value = response.data.content;
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  const applyInternship = async (jobId,payload) => {
    try {
      const response = await apiClient.post(`intern/apply/${jobId}`,payload,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchApplicationList = async () => {
    try {
      const response = await apiClient.get(`/intern/applications`);
      applicationLists.value = await response.data.content;
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAcceptOffer = async (applicationId) => {
    try {
      const response = await apiClient.patch(`/intern/acceptoffer/${applicationId}`);
      console.log(response.date.content.requiredHours);
      await fetchApplicationList()
    }catch(err) {
      console.log(err)
    }
  }
  const fetchRequiredHours = async () => {
    try {
      const response = await apiClient.get('/intern/profile')
      console.log(response.data.content.requiredHours);
      requiredHours.value = response.data.content.requiredHours
      console.log(response)
    }catch(err) {
      console.log(err)
    }
  }

  // Computed Properties
  const getNumberOfApplication = computed(() => {
    return applicationLists.value.length;
  })
  const getNumberOfNotification = computed(() => {
    const numberOfNotif = applicationLists.value.filter(item => item.isUpdated === true)
    return numberOfNotif.length;
  })
  
  const getNumberOfPendingApplication = computed(() => {
    return applicationLists.value.filter(item => item.status === 'Pending').length
  })
  const getNumberOfApprovedApplication = computed(() => {
    return applicationLists.value.filter(item => item.status === 'Approved').length
  })
  const getNumberOfAcceptedApplication = computed(() => {
    return applicationLists.value.filter(item => item.status === 'Accepted').length
  })
  const getNumberOfHoursRequired = computed(() => {
    return requiredHours.value
  })
  return {
    fetchInternshipLists,
    internshipLists,
    applyInternship,
    applicationLists,
    fetchApplicationList,
    getNumberOfApplication,
    getNumberOfNotification,
    handleAcceptOffer,
    fetchRequiredHours,
    requiredHours,
    getNumberOfHoursRequired,
    getNumberOfPendingApplication,
    getNumberOfApprovedApplication,
    getNumberOfAcceptedApplication
  };
});
