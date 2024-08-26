import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useInternStore } from "./InternStore";
export const useAuthStore = defineStore("auth", () => {
  const userRole = ref(null);
  const userId = ref(null);
  const currentUser = ref(null);
  const isInternReady = ref(null);
  const isAuthenticated = ref(false);
  const loginErrorMessage = ref('')
  const router = useRouter();
  const toast = useToast();
  const internStore = useInternStore()


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
        return (currentUser.value = response.data.content.profile.fullName);
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
      console.log(response.response);
      isAuthenticated.value = true;
      await checkAuth();
    } catch (err) {
      loginErrorMessage.value = err.response.data
      console.log(err.response.data);
      alert('Invalid username or password. Try again')
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
      alert('Invalid username or password. Try again')
    }
  };
  const internLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/intern/login", payload);
      console.log(response);
      router.push("/student/dashboard");
      await checkAuth();
    } catch (err) {
      console.log(err);
      alert('Invalid username or password. Try again')
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
  const submitInternLogout = async () => {
    try {
      if(isAuthenticated.value && internStore.isClockIn) {
        router.push("/student/dashboard/dtr");
       return alert('Logout failed, Please clock out first')
      }
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
    loginErrorMessage,
    submitInternLogout
  };
});
