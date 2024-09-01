import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useAdminUserStore = defineStore("user", () => {
  const usersList = ref([]);
  const departmentlist = ref([]);
  const internsList = ref([])
  const currentRole = ref("");
  const attendanceArr = ref([])
  const userRoleList = reactive({
    hte: "",
    coor: "",
    intern: "",
    admin: "",
  });
  const updateInfo = reactive({
    coorId: "",
    username: "",
    email: "",
    fullName: "",
    contactNumber: "",
    department: "",

    // HTE
    companyAddress: "",
    companyContact:'',
    hasMoa: "",
    location: "",
    companyName: '',
    mapLocation: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    hteProfileId:'',
    hasMoa:'',
    companyEmail:'',

    // Intern
    internEmail:'',
    internName:'',
    internContact:'',
    internDepartment:'',
    requiredHours:'',
    internId:''


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
      userRoleList.hte = await response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const fetchInterns = async () => {
    try {
      const response = await apiClient.get("/intern");
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
      await fetchUsers();
      console.log(response);
      return response ;
    } catch (err) {
      console.log(err);
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
      await fetchUsers();
      console.log(response);
      return response ;
    } catch (err) {
      console.log(err);
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
        updateInfo.fullName = response.data.content.profile.fullName;
        updateInfo.contactNumber = response.data.content.profile.contact;
        updateInfo.department = response.data.content.profile.department;
        updateInfo.username = response.data.content.username;
        currentRole.value = response.data.content.role;
      }
      if (response.data.content.role === "HTE") {
        updateInfo.hteProfileId = userId
        updateInfo.companyName = response.data.content.profile.name;
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
        updateInfo.internEmail = response.data.content.email
        updateInfo.internName = response.data.content.profile.fullName
        updateInfo.requiredHours = response.data.content.profile.requiredHours
        updateInfo.internContact = response.data.content.profile.contact
        updateInfo.internDepartment = response.data.content.profile.department
        currentRole.value = response.data.content.role;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateInformationCoor = async () => {
    const payload = {
      fullname: updateInfo.fullName,
      email: updateInfo.email,
      contact: updateInfo.contactNumber,
      department: updateInfo.department,
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

      name:updateInfo.companyName,
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
      name:updateInfo.internName,
      contact: updateInfo.internContact,
      requiredHours: updateInfo.requiredHours,
      department: updateInfo.internDepartment
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
      const response = await apiClient.get(
        `/admin/internlist`);
      internsList.value = response.data.content;
      console.log(internsList.value);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  const fetchInternDailyLogs = async(id) => {
    try {
      const response = await apiClient.get(`/admin/dtrlogs/${id}`);
      console.log(response.data.content);
      
      attendanceArr.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // Computed

  const getNumberOfUsers = computed(() => {
    return usersList.value.length;
  });
  const getNumberOfHTE = computed(() => {
    return usersList.value.filter((item) => item.role === "HTE").length;
  });
  const getNumberOfInterns = computed(() => {
    return usersList.value.filter((item) => item.role === "Intern").length;
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
    fetchInternDailyLogs
    
  };
});
