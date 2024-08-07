import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useHteStore = defineStore("hte", () => {
  const internshipList = ref([]);
  const applicantList = ref([]);
  const jobName = ref('')
  const datePosted = ref('')
  const applicantId = ref('')
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

    try {
      const response = await apiClient.delete(`/hte/${id}`);
      console.log(response);
      await fetchInternships()
    }catch(err){
      console.log(err);
    }
  };

  const fetchSingleApplication = () => {
    
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
    applicantId
    
  };
});
