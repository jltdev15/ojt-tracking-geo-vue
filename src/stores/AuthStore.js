import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useInternStore } from "./InternStore";
export const useAuthStore = defineStore("auth", () => {
  const userRole = ref(null);
  const userId = ref(null);
  const currentUser = ref(null);
  const currentDepartment = ref(null);
  const coorId = ref(null);
  const hteId = ref(null);
  const errorMessage = ref("");
  const isEmailExist = ref(false);
  const isInternReady = ref(null);
  const isAuthenticated = ref(false);
  const loginErrorMessage = ref("");
  const router = useRouter();
  const toast = useToast();
  const sessionCode = ref("");
  const currentRole = ref("");

  const internStore = useInternStore();

  const internInformation = reactive({
    fullName: "",
    internId: "",
    email: "",
    contact: "",
    address: "",
    department: "",
  });
  const hteInformation = reactive({
    name: "",
    email: "",
    contact: "",
    address: "",
    location: {},
  });

  const checkAuth = async () => {
    try {
      const response = await apiClient.get(`/active`);
      console.log(response);
      userRole.value = response.data.content.role;
      userId.value = response.data.content._id;
      isAuthenticated.value = true;
      if (userRole.value === "Admin") {
        currentRole.value = response.data.content.role;
        return (currentUser.value = response.data.content.profile.firstname);
      }
      if (userRole.value === "HTE") {
        hteId.value = response.data.content.profile._id
        hteInformation.name = response.data.content.profile.fullName;
        hteInformation.email = response.data.content.email;
        hteInformation.contact = response.data.content.profile.contactNumber;
        hteInformation.address = response.data.content.profile.address;
        hteInformation.location = response.data.content.profile.location;
        return (currentUser.value = response.data.content.profile.fullName);
      }
      if (userRole.value === "Coordinator") {
        currentDepartment.value = response.data.content.profile.department;
        coorId.value = response.data.content.profile._id;
        currentRole.value = response.data.content.role;
        return (currentUser.value = response.data.content.profile.fullName);
      }
      if (userRole.value === "Intern") {
        internInformation.fullName = response.data.content.profile.fullName;
        internInformation.internId = response.data.content.username;
        internInformation.email = response.data.content.email;
        internInformation.contact = response.data.content.profile.contact;
        internInformation.address = response.data.content.profile.address;
        internInformation.department = response.data.content.profile.department;

        isInternReady.value = response.data.content.profile.isInternshipReady;
        sessionCode.value = response.data.content.profile.sessionCode;
        if (sessionCode.value !== localStorage.getItem("sessionCode")) {
          await submitLogout();
        }
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
      loginErrorMessage.value = err.response.data;
      console.log(err.response.data);
      alert("Invalid username or password. Try again");
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
      alert("Invalid username or password. Try again");
    }
  };
  const internLogin = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/intern/login", payload);
      console.log(response);
      router.push("/student/dashboard");

      if (response.data.content) {
        localStorage.setItem("sessionCode", response.data.content);
        sessionCode.value = localStorage.getItem("sessionCode");
      }
      await checkAuth();
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
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
    console.log(internStore.isClockIn);
    console.log(isAuthenticated.value);

    try {
      await apiClient.post("/admin/logout", {});
      isAuthenticated.value = false;
    } catch (err) {
      console.log(err);
    }
  };
  const getLocationHandler = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationData.lat = position.coords.latitude;
          locationData.lng = position.coords.longitude;
          isLocationEnabled.value = true;
        },
        (err) => {
          errorMessage.value = `Error: ${err.message}`;
        }
      );
    } else {
      errorMessage.value = "Geolocation is not supported by this browser.";
    }
  };

  const submitPasswordRequest = async (emailValue) => {
    console.log(emailValue);
    try {
      const response = await apiClient.post(
        "/requestResetPassword",
        emailValue
      );
      toast.success("Reset link has been sent", {
        timeout: 1500,
      });
      console.log(response);

      setTimeout(() => {
        router.replace("/auth");
      }, 1800);
    } catch (err) {
      toast.error(err.response.data.content, {
        timeout: 1500,
      });
      console.log(err.response.data.content);
      isEmailExist.value = true;
    }
  };
  const removeErrorMessage = async () => {
    isEmailExist.value = false;
  };
  const sumbitSetPassword = async (payload) => {
    try {
      const setPass = await apiClient.post("/resetPassword", payload);
      toast.success("Success", {
        timeout: 1500,
      });
      setTimeout(() => {
        router.replace("/auth");
      }, 1800);
      console.log(setPass);
    } catch (err) {
      console.log(err);
    }
  };
  const updatePersonalInfo = async () => {
    const payload = {
      email: internInformation.email,
      contact: internInformation.contact,
      address: internInformation.address,
    };
    console.log(payload);

    try {
      const response = await apiClient.patch(
        `/intern/update/information`,
        payload
      );
      console.log(response.status);
    } catch (err) {
      console.log(err);
    }
  };
  const updateHteInfo = async () => {
    const payload = {
      email: hteInformation.email,
      contact: hteInformation.contact,
      address: hteInformation.address,
      location: hteInformation.location,
    };
    console.log(payload);

    try {
      const response = await apiClient.patch(
        `/hte/update/information`,
        payload
      );
      console.log(response.status);
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
    submitInternLogout,
    getLocationHandler,
    currentDepartment,
    coorId,
    sessionCode,
    removeErrorMessage,
    errorMessage,
    isEmailExist,
    submitPasswordRequest,
    sumbitSetPassword,
    internInformation,
    updatePersonalInfo,
    hteInformation,
    updateHteInfo,
    currentRole,
    hteId
  };
});
