import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
import { useAuthStore } from "./AuthStore";
export const useAdminUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const usersList = ref([]);
  const departmentlist = ref([]);
  const internsList = ref([]);
  const htesList = ref([]);
  const hteInternshipList = ref([]);
  const coordinatorList = ref([]);
  const currentRole = ref("");
  const currentDepartment = ref("");
  const attendanceArr = ref([]);
  const announcementList = ref([]);
  const applicationList = ref([]);
  const requestList = ref([]);
  const vacancyList = ref([]);
  const coorRequestList = ref([]);
  const requestListBy = ref("");
  const evaluationResults = ref("");

  const userRoleList = reactive({
    hte: "",
    coor: "",
    intern: "",
    admin: "",
  });
  const updateInfo = reactive({
    // Coor
    coorId: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    department: "",
    street: "",
    province: "",
    municipality: "",
    brgy: "",

    // HTE
    companyEmail: "",
    companyName: "",
    companyContact: "",
    companyProvince: "",
    companyMunicipality: "",
    companyBrgy: "",
    companyStreet: "",
    location: "",
    mapLocation: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    hteProfileId: "",
    hasMoa: "",


    // Intern
    internEmail: "",
    internfirstName: "",
    internlastName: "",
    internContact: "",
    internProvince: "",
    internMunicipality: "",
    internBrgy: "",
    internStreet: "",
    internDepartment: "",
    requiredHours: "",
    internId: "",
    internMiddle:''
  });

  // Methods
  const fetchAllUsers = async () => {
    await fetchHTE();
    await fetchInterns();
    await fetchCoor();
    await fetchAdmin();
  };
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/users");
      console.log(response);
      usersList.value = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHTE = async () => {
    try {
      const response = await apiClient.get("/hte");
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      userRoleList.hte = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchInterns = async () => {
    try {
      const response = await apiClient.get("/intern");
      console.log(response);

      userRoleList.intern = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCoor = async () => {
    try {
      const response = await apiClient.get("/coor");
      console.log(response.data);
      userRoleList.coor = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAdmin = async () => {
    try {
      const response = await apiClient.get("/admin");
      console.log(response.data);
      userRoleList.admin = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const addIntern = async (payload) => {
    // console.log(payload);
    try {
      const response = await apiClient.post("/intern", payload);

      console.log(response.data.message);
      alert(response.data.message);
      await fetchUsers();
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response.data.message) {
        return alert("Duplicate username. Please try other one");
      }
    }
  };
  const addHTE = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/hte", payload);
      await fetchUsers();
      return response.data.message;
    } catch (err) {
      console.log(err);
    }
  };

  const addCoordinator = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/coor", payload);
      alert(response.data.message);
      await fetchUsers();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
  //#region Department List
  const fetchDepartmentList = async () => {
    try {
      const response = await apiClient.get("/admin/departmentlist");
      await fetchUsers();
      console.log(response);
      departmentlist.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const addDepartmentList = async (payload) => {
    console.log(payload);

    try {
      const response = await apiClient.post("/admin/departmentlist", payload);
      await fetchUsers();
      await fetchDepartmentList();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const updateDepartmentList = async (departmentId, payload) => {
    console.log(departmentId);

    console.log(payload);

    try {
      const response = await apiClient.put(
        `/admin/departmentlist/${departmentId}`,
        payload
      );
      await fetchUsers();
      await fetchDepartmentList();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDepartmentList = async (departmentId) => {
    try {
      const response = await apiClient.delete(
        `/admin/departmentlist/${departmentId}`
      );
      await fetchUsers();
      await fetchDepartmentList();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  //#endregion
  // #region
  const removeAccount = async (userId) => {
    console.log(userId);
    try {
      const response = await apiClient.delete(`/accounts/${userId}`);
      await fetchUsers();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUpdateInformation = async (userId) => {
    try {
      const response = await apiClient.get(`/accounts/${userId}`);
      console.log(response);
      console.log(response.data.content.role);
      if (response.data.content.role === "Coordinator") {
        updateInfo.coorId = userId;
        updateInfo.email = response.data.content.email;
        updateInfo.firstName = response.data.content.profile.firstName;
        updateInfo.lastName = response.data.content.profile.lastName;
        updateInfo.contactNumber = response.data.content.profile.contact;
        updateInfo.street = response.data.content.profile.street;
        updateInfo.province = await response.data.content.profile.province;
        updateInfo.municipality = await response.data.content.profile.municipality;
        updateInfo.brgy = await response.data.content.profile.brgy;
        updateInfo.department = response.data.content.profile.department;
        updateInfo.username = response.data.content.username;
        currentRole.value = response.data.content.role;
      }
      if (response.data.content.role === "HTE") {
        updateInfo.hteProfileId = userId;
        updateInfo.companyName = response.data.content.profile.fullName;
        updateInfo.companyAddress = response.data.content.profile.address;
        updateInfo.companyContact = response.data.content.profile.contactNumber;
        updateInfo.mapLocation.lat = response.data.content.profile.location.lat;
        updateInfo.mapLocation.lng = response.data.content.profile.location.lng;
        updateInfo.hasMoa = response.data.content.profile.hasMoa;
        updateInfo.companyEmail = response.data.content.email;
        currentRole.value = response.data.content.role;
      }
      if (response.data.content.role === "Intern") {
        updateInfo.internId = userId;
        updateInfo.internEmail = response.data.content.email;
        updateInfo.internfirstName = response.data.content.profile.firstName;
        updateInfo.internlastName = response.data.content.profile.lastName;
        updateInfo.requiredHours = response.data.content.profile.requiredHours;
        updateInfo.internContact = response.data.content.profile.contact;
        updateInfo.internProvince = response.data.content.profile.province;
        updateInfo.internMunicipality = response.data.content.profile.municipality;
        updateInfo.internBrgy = response.data.content.profile.brgy;
        updateInfo.internStreet = response.data.content.profile.street;
        updateInfo.internMiddle = response.data.content.profile.middleInitial;

        updateInfo.internDepartment = response.data.content.profile.department;
        currentRole.value = response.data.content.role;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateInformationCoor = async () => {
    const payload = {
      firstName: updateInfo.firstName,
      lastName: updateInfo.lastName,
      contactNumber: updateInfo.contactNumber,
      department: updateInfo.department,
      street: updateInfo.street,
      brgy: updateInfo.brgy,
      municipality: updateInfo.municipality,
      province: updateInfo.province,
      email: updateInfo.email,

    };
    console.log(updateInfo);

    try {
      const response = await apiClient.patch(
        `/accounts/${updateInfo.coorId}`,
        payload
      );

      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const updateInformationHTE = async () => {
    const payload = {
      email: updateInfo.companyEmail,

      name: updateInfo.companyName,
      address: updateInfo.companyAddress,
      contactNumber: updateInfo.companyContact,
      location: updateInfo.mapLocation,
      hasMoa: updateInfo.hasMoa,
    };
    try {
      const response = await apiClient.patch(
        `/accounts/${updateInfo.hteProfileId}`,
        payload
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const updateInformationIntern = async () => {
    const payload = {
      email: updateInfo.internEmail,
      firstName: updateInfo.internfirstName,
      lastName: updateInfo.internfirstName,
      contact: updateInfo.internContact,
      province: updateInfo.internProvince,
      municipality: updateInfo.internMunicipality,
      brgy: updateInfo.internBrgy,
      street: updateInfo.internStreet,
      middleInitial: updateInfo.internMiddle,
      // requiredHours: updateInfo.requiredHours,
      department: updateInfo.internDepartment,
    };
    try {
      const response = await apiClient.patch(
        `/accounts/${updateInfo.internId}`,
        payload
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  //#endregion

  const fetchInternsList = async () => {
    try {
      const response = await apiClient.get(`/admin/internlist`);
      internsList.value = response.data.content;
      console.log(internsList.value);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchInternDailyLogs = async (id) => {
    try {
      const response = await apiClient.get(`/admin/dtrlogs/${id}`);
      console.log(response.data.content);

      attendanceArr.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const resetDeviceRestriction = async (internId) => {
    try {
      const response = await apiClient.patch(`/admin/resetdevice/${internId}`);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const fetchHTEList = async () => {
    try {
      const response = await apiClient.get(`/admin/hte`);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      htesList.value = response.data.content;
      console.log(internsList.value);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHTEInternship = async (id) => {
    try {
      const response = await apiClient.get(`/admin/hte/${id}`);
      console.log("====================================");
      console.log(response);
      console.log("====================================");
      hteInternshipList.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchInternshipApplicantList = async (jobId) => {
    try {
      const response = await apiClient.get(`/hte/list/${jobId}`);
      console.log(response.data.content);
      // jobName.value = response.data.content.jobTitle;
      // datePosted.value = response.data.content.createdAt;
      // applicantItemList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };

  // Coordinator List
  const fetchCoordinator = async () => {
    try {
      const response = await apiClient.get(`/admin/coor`);
      console.log(response);
      coordinatorList.value = response.data.content;
      // jobName.value = response.data.content.jobTitle;
      // datePosted.value = response.data.content.createdAt;
      // applicantItemList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };

  // Announcement list

  const fetchAnnouncement = async () => {
    try {
      const response = await apiClient.get(`/announcement/view`);
      console.log(response);
      announcementList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const addAnnouncement = async (payload) => {
    console.log(payload);

    try {
      const response = await apiClient.post(`/announcement/add`, payload);
      console.log(response);
      await fetchAnnouncement();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplicationList = async () => {
    try {
      const response = await apiClient.get(`/admin/application`);
      console.log(response);
      applicationList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRequestList = async () => {
    try {
      const response = await apiClient.get(`/admin/request/list`);
      console.log(response);
      requestList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCoorRequestList = async (coorId) => {
    try {
      const response = await apiClient.get(`/admin/request/${coorId}`);
      console.log(response);
      coorRequestList.value = response.data.content;
      requestListBy.value = response.data.content[0].requestorName;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHTEListing = async () => {
    try {
      const response = await apiClient.get(`/admin/vacancy`);
      console.log(response);
      vacancyList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const updateAnnouncement = async (idToUpdate, payload) => {
    try {
      const response = await apiClient.patch(
        `/announcement/update/${idToUpdate}`,
        payload
      );
      console.log(response);
      await fetchAnnouncement();
    } catch (err) {
      console.log(err);
    }
  };
  const getEvaluationItemResults = async (internId) => {
    try {
      const response = await apiClient.get(`/hte/view/evaluation/${internId}`);
      console.log(response);
      evaluationResults.value = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  // Computed
  const getNumberOfVacancy = computed(() => {
    return vacancyList.value.length;
  });
  const getNumberVisitationSent = computed(() => {
    return requestList.value.length;
  });
  const getNumberVisitationDone = computed(() => {
    return requestList.value.filter((item) => item.status === "Done").length;
  });

  const getNumberInternDeployed = computed(() => {
    return applicationList.value.filter((item) => item.status === "Accepted")
      .length;
  });
  const getNumberInternFinished = computed(() => {
    return applicationList.value.filter((item) => item.status === "Finished")
      .length;
  });

  // Return only list for coor
  const getCoorAnnouncementList = computed(() => {
    return announcementList.value.filter(
      (item) => item.department === authStore.currentDepartment
    );
  });
  const getAdminAnnouncementList = computed(() => {
    return announcementList.value.filter((item) => item.role === "Admin");
  });

  const getNumberOfUsers = computed(() => {
    return usersList.value.length;
  });
  const getNumberOfUsersOnly = computed(() => {
    return usersList.value.filter((item) => item.role !== "Admin");
  });
  const getNumberOfHTE = computed(() => {
    return usersList.value.filter((item) => item.role === "HTE").length;
  });
  const getNumberOfInterns = computed(() => {
    return usersList.value.filter((item) => item.role === "Intern").length;
  });
  // For showing which account has session code
  const getInternAccounts = computed(() => {
    return usersList.value.filter(
      (item) => item.role === "Intern" && item.profile.sessionCode !== null
    );
  });
  const getNumberOfCoor = computed(() => {
    return usersList.value.filter((item) => item.role === "Coordinator").length;
  });
  const getNumberOfAdmin = computed(() => {
    return userRoleList.admin.length;
  });
  const getNumberOfDepartment = computed(() => {
    return departmentlist.value.length;
  });
  return {
    fetchUsers,
    usersList,
    addIntern,
    addHTE,
    getNumberOfUsers,
    getNumberOfHTE,
    getNumberOfInterns,
    getNumberOfCoor,
    fetchHTE,
    fetchInterns,
    userRoleList,
    fetchCoor,
    fetchAdmin,
    getNumberOfAdmin,
    fetchAllUsers,
    addCoordinator,
    fetchDepartmentList,
    departmentlist,
    addDepartmentList,
    updateDepartmentList,
    deleteDepartmentList,
    removeAccount,
    fetchUpdateInformation,
    updateInfo,
    updateInformationCoor,
    currentRole,
    updateInformationHTE,
    updateInformationIntern,
    getNumberOfDepartment,
    fetchInternsList,
    internsList,
    attendanceArr,
    fetchInternDailyLogs,
    getInternAccounts,
    resetDeviceRestriction,
    fetchHTEList,
    htesList,
    hteInternshipList,
    fetchHTEInternship,
    fetchInternshipApplicantList,
    getNumberOfUsersOnly,
    fetchCoordinator,
    coordinatorList,
    fetchAnnouncement,
    announcementList,
    addAnnouncement,
    getCoorAnnouncementList,
    getAdminAnnouncementList,
    fetchApplicationList,
    applicationList,
    getNumberInternDeployed,
    getNumberInternFinished,
    requestList,
    fetchRequestList,
    getNumberVisitationSent,
    getNumberVisitationDone,
    fetchHTEListing,
    vacancyList,
    fetchCoorRequestList,
    coorRequestList,
    requestListBy,
    getNumberOfVacancy,
    updateAnnouncement,
    evaluationResults,
    getEvaluationItemResults,
  };
});
