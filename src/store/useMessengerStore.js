import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useMessengerStore = defineStore("messenger", () => {
  const userStore = reactive({
    username: [],
    id: "",
    allUser: [],
  });
  const userId = ref(null);

  const fetchUser = async () => {
    try {
      const response = await apiClient.get(`/active`);
      console.log(response);
      userStore.username = response.data.content.username;
      userStore.id = response.data.content._id;
      userId.value = response.data.content._id;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllUser = async () => {
    try {
      const response = await apiClient("/users");
      userStore.allUser = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    userStore,
    fetchUser,
    fetchAllUser,
    userId
  };
});
