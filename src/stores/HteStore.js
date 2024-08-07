import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useHteStore = defineStore("hte", () => {
  const internshipList = ref([]);
  const applicantList = ref([]);
  const jobName = ref('')
  const datePosted = ref('')
  const applicantRequirements = ref([])

  const fetchInternships = async () => {  
    try {
      const response = await apiClient.get(`/hte/list` );
      console.log(response);
      
      if(response.data.content) {
        internshipList.value = response.data.content
        
      }

    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleInternships = async (jobId) => {  
    try {
      const response = await apiClient.get(`/hte/list/${jobId}` );
      jobName.value = response.data.content.title;
      datePosted.value = response.data.content.createdAt;
      console.log(response.data.content.title);
      console.log(response.data.content.applicants);
      applicantList.value = response.data.content.applicants;
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

  const fetchSingleApplication = async (jobId,applicantId) => {
    try {
      const response = await apiClient.get(`/hte/applicants/${jobId}/intern/${applicantId}` );
      console.log(response.data.content);
      applicantRequirements.value = response.data.content;

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
  const getNumberOfApplicants = computed(() => {
    return applicantList.value.length;
  })
  return {
    fetchInternships,
    internshipList,
    postInternship,
    removeInternship,
    applicantList,
    fetchSingleInternships,
    jobName,
    datePosted,
    getNumberOfApplicants,
    fetchSingleApplication,
    applicantRequirements,
    acceptIntershipApplication
    
  };
});
