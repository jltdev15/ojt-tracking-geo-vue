import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useHteStore = defineStore("hte", () => {
  const internshipList = ref([]);

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
  const postInternship = async (payload) => {
    console.log(payload);

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

  return {
    fetchInternships,
    internshipList,
    postInternship,
    removeInternship
  };
});
