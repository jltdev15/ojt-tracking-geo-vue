import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
export const useAuthStore = defineStore("auth", () => {
  const userRole = ref(null);
  const userId = ref(null);
  const currentUser = ref(null);
  const isInternReady = ref(null);
  const isAuthenticated = ref(false);
  const router = useRouter();
  const toast = useToast();

  const checkApiConnection = async () => {};
  const checkAuth = async () => {
    try {
      const response = await apiClient.get(`/active`);
      userRole.value = response.data.content.role;
      userId.value = response.data.content._id;
      isAuthenticated.value = true;
      if (userRole.value === "Admin") {
        return (currentUser.value = response.data.content.profile.firstname);
      }
      if (userRole.value === "HTE") {
        return (currentUser.value = response.data.content.profile.name);
      }
      if (userRole.value === "Coordinator") {
        return (currentUser.value = response.data.content.profile.firstname);
      }
      if (userRole.value === "Intern") {
        isInternReady.value = response.data.content.profile.isInternshipReady;
        return (currentUser.value = response.data.content.profile.fullName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const adminLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/admin/login", payload);
      console.log(response);
      isAuthenticated.value = true;
      await checkAuth();
    } catch (err) {
      console.log(err);
    }
  };
  const hteLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/hte/login", payload);
      console.log(response.data.content._id);
      isAuthenticated.value = true;
      await checkAuth();
    } catch (err) {
      console.log(err);
    }
  };
  const internLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/intern/login", payload);
      isAuthenticated.value = true;
      await checkAuth();
    } catch (err) {
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
    submitLogout,
    currentUser,
    isInternReady,
  };
});
