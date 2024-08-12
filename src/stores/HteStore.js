import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useHteStore = defineStore("hte", () => {
  const internshipList = ref([]);
  const applicantList = ref([]);
  const applicantItemList = ref([]);
  const pendingApplicantList = ref([]);
  const jobName = ref('')
  const datePosted = ref('')
  const applicantRequirements = ref([])
  const acceptedApplicantsList = ref([])


  const fetchApplicantList = async () => {
    try {
      const response = await apiClient.get(`/hte/applicants/list` );
      console.log(response.data.content);
      applicantList.value = await response.data.content;

    } catch (err) {
      console.log(err);
    }
  }
  const fetchInternships = async () => {  
    try {
      const response = await apiClient.get(`/hte/list` );
      internshipList.value = response.data.content
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleInternships = async (jobId) => {  
    try {
      const response = await apiClient.get(`/hte/list/${jobId}` );
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
      const response = await apiClient.post(`/hte/create/`,payload);
      console.log(response);
      await fetchInternships()
    }catch(err){
      console.log(err);
    }
  };
  const removeInternship = async (id) => {
    console.log(id);
    
    try {
      const response = await apiClient.delete(`/hte/delete/${id}`);
      console.log(response);
      await fetchInternships()
    }catch(err){
      console.log(err);
    }
  };

  // Get list of applicant on specific job
  const fetchSingleApplication = async (jobId,applicantId) => {
    try {
      const response = await apiClient.get(`/hte/applicants/${jobId}/intern/${applicantId}` );
      console.log(response.data.content);
      applicantRequirements.value = response.data.content;

    } catch (err) {
      console.log(err);
    }
  }
  const fetchAcceptedInterns = async () => {
    try {
      const response = await apiClient.get(`/hte/applicants/approved` );
      console.log(response.data.content);
      acceptedApplicantsList.value = await response.data.content;

    } catch (err) {
      console.log(err);
    }
  }
  const fetchPendingInterns = async () => {
    try {
      const response = await apiClient.get(`/hte/applicants/pending` );
      console.log(response.data.content);
      pendingApplicantList.value = await response.data.content;

    } catch (err) {
      console.log(err);
    }
  }
  const acceptIntershipApplication = async (applicationId) => {
    console.log(applicationId);
    
    try {
      const response = await apiClient.put(`/hte/application/${applicationId}/accept` );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  // Computed
  const getNumberOfApplicants = computed(() => {
    return applicantItemList.value.length;
  })
  const getNumberOfListing = computed(() => {
    return internshipList.value.length;
  })
  const getNumberOfAcceptedInterns = computed(() => {
    return acceptedApplicantsList.value.length;
  })
  const getNumberOfPendingInterns = computed(() => {
    return pendingApplicantList.value.length;
  })
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
    fetchAcceptedInterns,
    acceptedApplicantsList,
    getNumberOfAcceptedInterns,
    fetchPendingInterns,
    pendingApplicantList,
    getNumberOfPendingInterns,
    fetchApplicantList,
    applicantList
    
  };
});
