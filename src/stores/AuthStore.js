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

  const hteLocationDefault = reactive({
    lat: "",
    lng: "",
  });
  const internStore = useInternStore();

  const internInformation = reactive({
    firstName: "",
    middleInitial: "",
    lastName: "",
    contact: "",
    age: "",
    birthday: "",
    street: "",
    brgy: "",
    municipality: "",
    province: "",
    department: "",
    email: "",
    userName: "",
  });
  const hteInformation = reactive({
    name: "",
    email: "",
    contact: "",
    province: "",
    municipality: "",
    brgy: "",
    street: "",
    address: "",
    lat: "",
    lng: "",
    location: {},
  });
  const adminInformation = reactive({
    firstName: "",
    lastName: "",
    contact: "",
    street: "",
    brgy: "",
    municipality: "",
    province: "",
    email: "",
  });
  const coorInformation = reactive({
    firstName: "",
    lastName: "",
    contact: "",
    street: "",
    brgy: "",
    municipality: "",
    province: "",
    email: "",
    department:''
  });

  const checkAuth = async () => {
    try {
      const response = await apiClient.get(`/active`);
      console.log(response);
      userRole.value = response.data.content.role;
      userId.value = response.data.content._id;
      isAuthenticated.value = true;
      if (userRole.value === "Admin") {
        adminInformation.firstName = response.data.content.profile.firstName;
        adminInformation.lastName = response.data.content.profile.lastName;
        adminInformation.contact = response.data.content.profile.contact;
        adminInformation.street = response.data.content.profile.street;
        adminInformation.brgy = response.data.content.profile.brgy;
        adminInformation.municipality =
          response.data.content.profile.municipality;
        adminInformation.province = response.data.content.profile.municipality;
        adminInformation.email = response.data.content.email;
        currentRole.value = response.data.content.role;
        return (currentUser.value = response.data.content.profile.firstName);
      }
      if (userRole.value === "HTE") {
        hteInformation.lat = response.data.content.profile.location.lat;
        hteInformation.lng =  response.data.content.profile.location.lng;
        hteId.value = response.data.content.profile._id;
        hteInformation.name = response.data.content.profile.fullName;
        hteInformation.email = response.data.content.email;
        hteInformation.contact = response.data.content.profile.contactNumber;
        hteInformation.province = response.data.content.profile.province;
        hteInformation.municipality =
          response.data.content.profile.municipality;
        hteInformation.brgy = response.data.content.profile.brgy;
        hteInformation.street = response.data.content.profile.street;

        hteInformation.address =
          response.data.content.profile.street +
          " " +
          response.data.content.profile.brgy +
          " " +
          response.data.content.profile.municipality +
          " " +
          response.data.content.profile.province;
        hteInformation.location = response.data.content.profile.location;
        hteLocationDefault.lat = response.data.content.profile.location.lat;
        hteLocationDefault.lng = response.data.content.profile.location.lng;
     
        return (currentUser.value = response.data.content.profile.fullName);
      }
      if (userRole.value === "Coordinator") {
        currentDepartment.value = response.data.content.profile.department;
        coorId.value = response.data.content.profile._id;
        currentRole.value = response.data.content.role;
        coorInformation.firstName = response.data.content.profile.firstName;
        coorInformation.lastName = response.data.content.profile.lastName;
        coorInformation.email = response.data.content.email;
        coorInformation.department = response.data.content.profile.department;
        coorInformation.contact = response.data.content.profile.contact;
        coorInformation.street = response.data.content.profile.street;
        coorInformation.brgy = response.data.content.profile.brgy;
        coorInformation.municipality = response.data.content.profile.municipality;
        coorInformation.province = response.data.content.profile.province;
        coorInformation.firstName = response.data.content.profile.firstName;
        return (currentUser.value = response.data.content.profile.firstName + ' ' + response.data.content.profile.lastName);
      }
      if (userRole.value === "Intern") {
        internInformation.firstName = response.data.content.profile.firstName;
        internInformation.middleInitial =
          response.data.content.profile.middleInitial;
        internInformation.lastName = response.data.content.profile.lastName;
        internInformation.email = response.data.content.email;
        internInformation.contact = response.data.content.profile.contact;
        internInformation.age = response.data.content.profile.age;
        internInformation.internId = response.data.content.username;
        internInformation.birthday = response.data.content.profile.birthday;
        internInformation.street = response.data.content.profile.street;
        internInformation.brgy = await response.data.content.profile.brgy;
        internInformation.municipality = await response.data.content.profile
          .municipality;
        internInformation.province = await response.data.content.profile
          .province;
        internInformation.department = response.data.content.profile.department;
        internInformation.userName = response.data.content.username;
        isInternReady.value = response.data.content.profile.isInternshipReady;
        sessionCode.value = response.data.content.profile.sessionCode;
        if (sessionCode.value !== localStorage.getItem("sessionCode")) {
          await submitLogout();
        }
        return (currentUser.value = response.data.content.profile.firstName + " " + response.data.content.profile.lastName);
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
      firstName: internInformation.firstName,
      middleInitial: internInformation.middleInitial,
      lastName: internInformation.lastName,
      contact: internInformation.contact,
      age: internInformation.age,
      birthday: internInformation.birthday,
      street: internInformation.street,
      brgy: internInformation.brgy,
      municipality: internInformation.municipality,
      province: internInformation.province,
      department: internInformation.department,
      email: internInformation.email,
    };
    console.log(payload);

    try {
      const response = await apiClient.patch(
        `/intern/update/information`,
        payload
      );
      await checkAuth();
      console.log(response.status);
    } catch (err) {
      console.log(err);
    }
  };
  const updateHteInfo = async () => {
    const payload = {
      name: hteInformation.name,
      email: hteInformation.email,
      contact: hteInformation.contact,
      province: hteInformation.province,
      municipality: hteInformation.municipality,
      brgy: hteInformation.brgy,
      street: hteInformation.street,
      location: hteInformation.location,
    };
    console.log(payload);

    try {
      const response = await apiClient.patch(
        `/hte/update/information`,
        payload
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const updateAdminInfo = async () => {
    if (adminInformation.firstName === null && "") {
      return alert("First Name must not empty");
    }
    if (adminInformation.lastName == null && "") {
      return alert("Last Name must not empty");
    }
    if (adminInformation.contact == null) {
      return alert("Contact must not empty");
    }
    if (adminInformation.street == null || "") {
      return alert("Street must not empty");
    }
    if (adminInformation.brgy == null || "") {
      return alert("Barangay must not empty");
    }
    if (adminInformation.municipality == null || "") {
      return alert("Municipality must not empty");
    }
    if (adminInformation.province == null || "") {
      return alert("Province must not empty");
    }
    if (adminInformation.street == null || "") {
      return alert("Street must not empty");
    }
    const payload = {
      firstName: adminInformation.firstName,
      lastName: adminInformation.lastName,
      contact: adminInformation.contact,
      province: adminInformation.province,
      municipality: adminInformation.municipality,
      brgy: adminInformation.brgy,
      street: adminInformation.street,
      email: adminInformation.email,
    };
    try {
      const response = await apiClient.patch(`/admin/update/info`, payload);
      if (response.status === 201) {
        alert("Update success!!");
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const updateCoorInfo = async () => {
    if (coorInformation.firstName ===  "") {
      return alert("First Name must not empty");
    }
    if (coorInformation.lastName === "") {
      return alert("Last Name must not empty");
    }
    if (coorInformation.contact === null) {
      return alert("Contact must not empty");
    }
    if (coorInformation.street === "") {
      return alert("Street must not empty");
    }
    if (coorInformation.brgy === "") {
      return alert("Barangay must not empty");
    }
    if (coorInformation.municipality === "") {
      return alert("Municipality must not empty");
    }
    if (coorInformation.province ===  "") {
      return alert("Province must not empty");
    }
    if (coorInformation.street ==="") {
      return alert("Street must not empty");
    }
    if (coorInformation.email ==="") {
      return alert("Email must not empty");
    }
    const payload = {
      firstName: coorInformation.firstName,
      lastName: coorInformation.lastName,
      contact: coorInformation.contact,
      province: coorInformation.province,
      municipality: coorInformation.municipality,
      brgy: coorInformation.brgy,
      street: coorInformation.street,
      email: coorInformation.email,
    };
    try {
      const response = await apiClient.patch(`/coor/change/info`, payload);
      if (response.status === 201) {
        alert("Update success!!");
      }
      console.log(response);
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
    hteId,
    hteLocationDefault,
    adminInformation,
    updateAdminInfo,
    coorInformation,
    updateCoorInfo
  };
});
