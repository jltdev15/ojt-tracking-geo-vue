import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useInternStore = defineStore("intern", () => {
  const internshipLists = ref([]);

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

  return {
    fetchInternshipLists,
    internshipLists,
    applyInternship


  };
});
