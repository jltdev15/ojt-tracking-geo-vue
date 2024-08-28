import { ref, computed,reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useCoorStore = defineStore("coor", () => {
  const internList = ref([]);
  const hteList = ref([])
  const requestList = ref([])


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
  const fetchRequestVisitation = async () => {
    try {
      const response = await apiClient.get(`/coor/requests`);
      requestList.value = response.data.content;
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  }


  return {
    fetchInternLists,
    internList,
    hteList,
    fetchHTELists,
    fetchRequestVisitation,
    requestList

    
  };
});
