import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useCoorStore = defineStore("coor", () => {
  const internList = ref([]);
  const hteList = ref([]);
  const requestList = ref([]);
  const requiredHours = ref("");
  const messageInfo = ref("");
  const internEvaluationList = ref([])

  const fetchInternLists = async () => {
    try {
      const response = await apiClient.get(`/coor/interns`);
      internList.value = response.data.content;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHTELists = async () => {
    try {
      const response = await apiClient.get(`/coor/hte`);
      hteList.value = response.data.content;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHTEItemList = async (id) => {
    try {
      const response = await apiClient.get(`/coor/hte/${id}`);
      hteList.value = response.data.content;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRequestVisitation = async () => {
    try {
      const response = await apiClient.get(`/coor/requests`);
      requestList.value = response.data.content;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const submitVisiRequest = async (payload) => {
    try {
      const response = await apiClient.post(`/coor/request`, payload);
      requestList.value = response.data.content;
      await fetchRequestVisitation();
      console.log(response);
      alert("Request sent");
      return response;
    } catch (err) {
      console.log(err);
      alert("Existing Request Found");
      return err;
    }
  };
  const setHoursRequired = async (id) => {
    const payload = {
      hours: requiredHours.value,
    };
    try {
      const response = await apiClient.patch(`/coor/set/${id}`, payload);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const removeVisitRequests = async (requestId) => {
    console.log(requestId);

    try {
      const response = await apiClient.delete(`/coor/requests/${requestId}`);
      await fetchRequestVisitation();
      alert("Remove Succesfully");
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const doneVisitRequest = async (requestId) => {
    console.log(requestId);

    try {
      const response = await apiClient.patch(`/coor/requests/${requestId}`);
      await fetchRequestVisitation();
      alert("Mark As Done Succesfully");
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const updateMOAhte = async (hteId, payload) => {

    try {
      const response = await apiClient.patch(`/coor/updateMOA/${hteId}`, payload,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Updated!");
      await fetchHTELists()
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const getInternEvaluation = async () => {

    try {
      const response = await apiClient.get(`/coor/evaluation`);
      console.log(response);
      internEvaluationList.value = response.data.content
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  // Computed
  const getNumberOfStudentEvaluated = computed(() => {
    return internEvaluationList.value.length;
  })
  const getNumberOfInterns = computed(() => {
    return internList.value.length;
  });
  const getNumberOfInternsDeployed = computed(() => {
    return internList.value.filter((item) => item.isInternshipReady === true)
      .length;
  });
  const getNumberOfHTE = computed(() => {
    return hteList.value.length;
  });
  const getNumberOfRequestDone = computed(() => {
    return requestList.value.filter((item) => item.status === "Done").length;
  });
  const getNumberOfRequestAccepted = computed(() => {
    return requestList.value.filter((item) => item.status === "Accepted")
      .length;
  });
  const getNumberOfRequestPending = computed(() => {
    return requestList.value.filter((item) => item.status === "Pending").length;
  });
  const getNumberOfRequestRejected = computed(() => {
    return requestList.value.filter((item) => item.status === "Rejected")
      .length;
  });

  return {
    fetchInternLists,
    internList,
    hteList,
    fetchHTELists,
    fetchRequestVisitation,
    requestList,
    fetchHTEItemList,
    submitVisiRequest,
    setHoursRequired,
    requiredHours,
    getNumberOfInterns,
    getNumberOfInternsDeployed,
    getNumberOfHTE,
    removeVisitRequests,
    doneVisitRequest,
    getNumberOfRequestDone,
    getNumberOfRequestAccepted,
    getNumberOfRequestRejected,
    getNumberOfRequestPending,
    updateMOAhte,
    internEvaluationList,
    getInternEvaluation,
    getNumberOfStudentEvaluated
  };
});
