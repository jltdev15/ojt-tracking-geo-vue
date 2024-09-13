import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import apiClient from "@/config/axiosClient";
export const useInternStore = defineStore("intern", () => {
  const internshipLists = ref([]);
  const applicationLists = ref([]);
  const requiredHours = ref(null);
  const workedHours = ref(null);
  const isClockIn = ref(false);
  const isLocationEnabled = ref(false);
  const errorMessage = ref("");
  const isInternReady = ref(false);
  const isEvalReady = ref(false);
  const locationData = reactive({
    lat: "",
    lng: "",
  });
  const hteInformation = ref({});
  const attendanceArr = ref([]);
  const evaluationResults = ref('')
  const applicationInfo = reactive({
    resume: "",
    resumePath: "",
    parent_consent: "",
    parent_consentPath: "",
    internEndorsement: "",
    internEndorsementPath: "",
    moa: "",
    moaPath: "",
    firstEndorsement: "",
    firstEndorsementPath: "",
    certificationFile: "",
    certificationPath: "",
    internshipAgreement: "",
    internshipAgreementPath: "",
  });

  // Methods
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
      alert("Application Sent");
      console.log(response);
    } catch (err) {
      console.log(err);
      alert(err.response.data.content);
    }
  };
  const fetchApplicationList = async () => {
    try {
      const response = await apiClient.get(`/intern/applications`);
      console.log(response);
      applicationLists.value = await response.data.content;
      
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
      isInternReady.value = response.data.content.isInternshipReady;
      isEvalReady.value = response.data.content.isEvaluationReady;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // Clock in
  const clockIn = async (payload) => {
    try {
      if (isEvalReady.value === true) {
        return alert(
          "You cant clock in. You already finished the required hours"
        );
      }
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
  };
  const sendLocationHandler = async () => {
    try {
      if ((isClockIn.value = true)) {
        const response = await apiClient.put(
          "intern/currentlocation",
          locationData
        );
        console.log(response);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const getAttendanceHandler = async () => {
    try {
      const response = await apiClient.get("/intern/attendance");
      console.log(response.data.content);

      attendanceArr.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const getHteInformation = async (id) => {
    try {
      const response = await apiClient.get(`/intern/hte/information/${id}`);
      console.log(response);
      hteInformation.value = response.data;
      attendanceArr.value = response.data.content;
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const removeApplicationHandler = async (id) => {
    try {
      const response = await apiClient.delete(`/intern/remove/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const fetchApplicationInformation = async (id) => {
    try {
      const response = await apiClient.get(`/intern/application/${id}`);
      applicationInfo.value = response.data;
      console.log(response.data);
      console.log(applicationInfo.value.resumeFile);
      console.log(applicationInfo.value.resumePath);

      applicationInfo.resume = response.data.resumeFile;
      applicationInfo.resumePath = response.data.resumePath;

      applicationInfo.parent_consent = response.data.parentConsentFile;
      applicationInfo.parent_consentPath = response.data.parentConsentPath;

      applicationInfo.internEndorsement = response.data.internEndorsementFile;
      applicationInfo.internEndorsementPath =
        response.data.internEndorsementPath;

      applicationInfo.moa = response.data.moaFile;
      applicationInfo.moaPath = response.data.moaPath;

      applicationInfo.firstEndorsement = response.data.firstEndorsementFormFile;
      applicationInfo.firstEndorsementPath =
        response.data.firstEndorsementFormPath;

      applicationInfo.certificationFile = response.data.certificationFormFile;
      applicationInfo.certificationPath = response.data.certificationFormPath;

      applicationInfo.internshipAgreement =
        response.data.internshipAgreementFile;
      applicationInfo.internshipAgreementPath =
        response.data.internshipAgreementPath;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const fetchEvaluationResults = async () => {
    try {
      const response = await apiClient.get(`/intern/results/evaluation`);
      evaluationResults.value = await response.data;
      console.log(response);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  // Computed Properties
  const getNumberOfApplication = computed(() => {
    return applicationLists.value.length;
  });
  // const getNumberOfNotification = computed(() => {
  //   const numberOfNotif = applicationLists.value.filter(
  //     (item) => item.isUpdated === true
  //   );
  //   return numberOfNotif.length;
  // });

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
    // getNumberOfNotification,
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
    getAttendanceHandler,
    isInternReady,
    removeApplicationHandler,
    fetchApplicationInformation,
    applicationInfo,
    hteInformation,
    getHteInformation,
    isEvalReady,
    evaluationResults,
    fetchEvaluationResults
  };
});
