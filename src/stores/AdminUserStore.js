import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useAdminUserStore = defineStore("user", () => {
  const usersList = ref([]);
  const departmentlist = ref([])
  const userRoleList = reactive({
    hte: "",
    coor: "",
    intern: "",
    admin: "",
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
  }
  const addDepartmentList = async (payload) => {
    console.log(payload);
    
    try {
      const response = await apiClient.post("/admin/departmentlist", payload);
      await fetchUsers();
      await fetchDepartmentList()
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  }
  const updateDepartmentList = async (departmentId, payload) => {
    console.log(departmentId);
    
    console.log(payload);
    
    try {
      const response = await apiClient.put(`/admin/departmentlist/${departmentId}`, payload);
      await fetchUsers();
      await fetchDepartmentList()
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  }
  const deleteDepartmentList = async (departmentId) => {
    
    try {
      const response = await apiClient.delete(`/admin/departmentlist/${departmentId}`);
      await fetchUsers();
      await fetchDepartmentList()
      console.log(response);
      
    } catch (err) {
      console.log(err);
    }
  }
  //#endregion
  // Computed



  const getNumberOfUsers = computed(() => {
    return usersList.value.length;
  });
  const getNumberOfHTE = computed(() => {
    return usersList.value.filter((item) => item.role === "HTE").length
  });
  const getNumberOfInterns = computed(() => {
    return usersList.value.filter((item) => item.role === "Intern").length
  });
  const getNumberOfCoor = computed(() => {
    return usersList.value.filter((item) => item.role === "Coordinator").length
  });
  const getNumberOfAdmin = computed(() => {
    return userRoleList.admin.length;
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
    deleteDepartmentList
  };
});
