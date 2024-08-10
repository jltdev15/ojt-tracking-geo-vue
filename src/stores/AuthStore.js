import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useAuthStore = defineStore("auth", () => {

  const userRole = ref(null);
  const userId = ref(null)
  const isAuthenticated = ref(false);

  const checkAuth = async () => {
    try {
      const response = await apiClient.get(`/active`);
      userRole.value = response.data.content.role;
      userId.value = response.data.content._id;
      isAuthenticated.value = true;
      console.log(isAuthenticated.value);
      console.log(userRole.value);
      
    } catch (err) {

      console.log(err);
    }
  };

  const adminLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post('/admin/login',payload);
      console.log(response);
      isAuthenticated.value = true;
      await checkAuth()

    }catch(err){
      console.log(err);
    }
  };
  const hteLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post('/hte/login',payload);
      console.log(response.data.content._id);
      isAuthenticated.value = true;
      await checkAuth()

    }catch(err){
      console.log(err);
    }
  };
  const internLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post('/intern/login',payload);
      isAuthenticated.value = true;
      await checkAuth()

    }catch(err){
      console.log(err);
    }
  };
  const submitLogout = async () => {
    try {
      await apiClient.post("/admin/logout", {});
      isAuthenticated.value = false;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    checkAuth,
    adminLogin,
    userRole,
    isAuthenticated,
    hteLogin,
    userId,
    internLogin,
    submitLogout
  };
});
