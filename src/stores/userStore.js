import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useUserStore = defineStore("user", () => {
  const usersList = ref([]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/users");
      if(response.data.content.length) {
        usersList.value = await response.data.content;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addIntern = async (payload) => {
    // console.log(payload);
    try {
      const response = await apiClient.post("/intern",payload);
      await fetchUsers()
      console.log(response);
    }catch(err){
      console.log(err);
    }
  };
  const addHTE = async (payload) => {
    console.log(payload);
    try {
      const response = await apiClient.post("/hte",payload);
      await fetchUsers()
      return (response.data.message);
    }catch(err){
      console.log(err);
    }
  };
  return {
    fetchUsers,
    usersList,
    addIntern,
    addHTE
  };
});
