import { ref, computed,reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useInternStore = defineStore("intern", () => {
  const internshipLists = ref([]);
  const applicationLists = ref([]);
  const requiredHours = ref(null);
  const workedHours = ref(null);
  const isClockIn = ref(false);
  const isLocationEnabled = ref(false)
  const errorMessage = ref("");
  const locationData = reactive({
    lat: "",
    lng: "",
  });
  const attendanceArr = ref([])
  const fetchInternshipLists = async () => {
    try {
      const response = await apiClient.get(`/intern/vacancy`);
      internshipLists.value = response.data.content;
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  const applyInternship = async (jobId, payload) => {
    try {
      const response = await apiClient.post(`intern/apply/${jobId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchApplicationList = async () => {
    try {
      const response = await apiClient.get(`/intern/applications`);
      applicationLists.value = await response.data.content;
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptOffer = async (applicationId) => {
    try {
      const response = await apiClient.patch(
        `/intern/acceptoffer/${applicationId}`
      );
      console.log(response.date.content.requiredHours);
      await fetchApplicationList();
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRequiredHours = async () => {
    try {
      const response = await apiClient.get("/intern/profile");
      console.log(response.data.content.requiredHours);
      isClockIn.value = response.data.content.isClockIn;
      requiredHours.value = response.data.content.requiredHours;
      workedHours.value = response.data.content.workedHours;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // Clock in
  const clockIn = async (payload) => {
    try {
      const response = await apiClient.post("/intern/timein", payload);
      await fetchRequiredHours();
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const clockOut = async (payload) => {
    try {
      const response = await apiClient.put("/intern/timeout", payload);
      await fetchRequiredHours();
      return response;
    } catch (err) {
      console.log(err);
      return err;
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

  }
  const sendLocationHandler = async() => {

    try {
       
     const response =  await apiClient.put('intern/currentlocation', locationData)

     console.log(response);
     

    }catch(err) {
      console.log(err.message)
    }
  }
  const getAttendanceHandler = async() => {
    try {
      const response = await apiClient.get("/intern/attendance");
      console.log(response.data.content);
      
      attendanceArr.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  // Computed Properties
  const getNumberOfApplication = computed(() => {
    return applicationLists.value.length;
  });
  const getNumberOfNotification = computed(() => {
    const numberOfNotif = applicationLists.value.filter(
      (item) => item.isUpdated === true
    );
    return numberOfNotif.length;
  });

  const getNumberOfPendingApplication = computed(() => {
    return applicationLists.value.filter((item) => item.status === "Pending")
      .length;
  });
  const getNumberOfApprovedApplication = computed(() => {
    return applicationLists.value.filter((item) => item.status === "Approved")
      .length;
  });
  const getNumberOfAcceptedApplication = computed(() => {
    return applicationLists.value.filter((item) => item.status === "Accepted")
      .length;
  });
  const getNumberOfHoursRequired = computed(() => {
    return requiredHours.value;
  });
  const getNumberOfHoursWorked = computed(() => {
    return Math.floor(workedHours.value);
  });
  return {
    fetchInternshipLists,
    internshipLists,
    applyInternship,
    applicationLists,
    fetchApplicationList,
    getNumberOfApplication,
    getNumberOfNotification,
    handleAcceptOffer,
    fetchRequiredHours,
    requiredHours,
    getNumberOfHoursRequired,
    getNumberOfPendingApplication,
    getNumberOfApprovedApplication,
    getNumberOfAcceptedApplication,
    clockIn,
    isClockIn,
    workedHours,
    getNumberOfHoursWorked,
    clockOut,
    sendLocationHandler,
    getLocationHandler,
    locationData,
    isLocationEnabled,
    attendanceArr,
    getAttendanceHandler
    
  };
});
