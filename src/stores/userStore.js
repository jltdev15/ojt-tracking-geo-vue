import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useUserStore = defineStore("user", () => {
  const usersList = ref([]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/users");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    fetchUsers,
    usersList,
  };
});
