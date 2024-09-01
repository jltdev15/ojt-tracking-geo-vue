import { ref, computed,reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useCoorStore = defineStore("coor", () => {
  const internList = ref([]);
  const hteList = ref([])
  const requestList = ref([])
  const requiredHours = ref('')

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
  const fetchHTEItemList = async (id) => {
    try {
      const response = await apiClient.get(`/coor/hte/${id}`);
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
  const submitVisiRequest = async (payload) => {
    try {
      const response = await apiClient.post(`/coor/request`,payload);
      requestList.value = response.data.content;
      console.log(response);
      return response;
      
    } catch (err) {
      console.log(err);
    }
  }
  const setHoursRequired = async (id) => {
    const payload = {
      hours: requiredHours.value
    }
    try {
      const response = await apiClient.patch(`/coor/set/${id}`,payload);
      console.log(response);
      return response;
      
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
    requestList,
    fetchHTEItemList,
    submitVisiRequest,
    setHoursRequired,
    requiredHours

    
  };
});
