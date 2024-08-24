import { ref, computed,reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useCoorStore = defineStore("coor", () => {
  const internList = ref([]);
  const hteList = ref([])
  const applicationLists = ref([]);
  const requiredHours = ref(null);
  const workedHours = ref(null);
  const isClockIn = ref(false);
  const isLocationEnabled = ref(false)
  const errorMessage = ref("");
  const locationData = reactive({
    lat: "",
    long: "",
  });

  const fetchInternLists = async () => {
    try {
      const response = await apiClient.get(`/coor/interns`);
      internList.value = response.data.content;
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHTELists = async () => {
    try {
      const response = await apiClient.get(`/coor/hte`);
      hteList.value = response.data.content;
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  };
  const applyInternship = async (jobId, payload) => {
    try {
      const response = await apiClient.post(`intern/apply/${jobId}`, payload, {
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
    fetchInternLists,
    internList,
    applyInternship,
    hteList,
    fetchHTELists

    
  };
});
