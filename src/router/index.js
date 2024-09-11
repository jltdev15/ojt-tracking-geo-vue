import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminDashBoardView from "../views/Admin/AdminDashBoardView.vue";
import AdminDashboard from "@/components/Admin/Dashboard.vue";
import HTEDashBoardView from "../views/HTE/HTEDashBoardView.vue";
import HTEDashboard from "@/components/Hte/Dashboard.vue";
import HTEInternshipsList from "@/components/Hte/Internships.vue";
import StudentDashBoardView from "../views/Student/StudentDashBoardView.vue";
import StudentDashboard from "@/components/Student/Dashboard.vue";
import StudentInternshipsList from "@/components/Student/InternshipsList.vue";
import CoorDashBoard from "@/components/Coor/Dashboard.vue";
import CoorDashBoardView from "../views/Coor/CoorDashBoardView.vue";
import { useAuthStore } from "@/stores/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false, roles: [""] },
    },
    {
      path: "/auth",
      name: "student_auth",
      component: () => import("../views/Student/StudentAuthView.vue"),
    },
    {
      path: "/passwordReset",
      name: "reset",
      component: () => import("../views/PasswordReset.vue"),
    },
    {
      path: "/recovery",
      name: "recovery",
      component: () => import("../views/PasswordRecovery.vue"),
    },
    // Admin
    {
      path: "/admin",
      redirect: "/admin/auth",
    },

    {
      path: "/admin/dashboard",
      component: AdminDashBoardView,
      meta: { requiresAuth: true, roles: ["Admin"] },
      children: [
        {
          path: "",
          name: "admin_dashboard",
          component: AdminDashboard,
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "manage-users",
          name: "manage_users",
          component: () => import("../components/Admin/Users.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "interns",
          name: "InternsList",
          component: () => import("../components/Admin/InternList.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "htelisting",
          name: "Hte_Listing",
          component: () => import("../components/Admin/HteListing.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "interns/:id",
          name: "DTRList",
          component: () =>
            import("../components/Admin/DailyTimeRecordList.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "manage-users/:id",
          name: "UpdateUser",
          component: () => import("../components/Admin/UpdateUser.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },

        {
          path: "settings",
          name: "appSettings",
          component: () => import("../components/Admin/Settings.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "hte",
          name: "hteLists",
          component: () => import("../components/Admin/HteList.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "hte/:id",
          name: "hteItem",
          component: () => import("../components/Admin/HTEItem.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "internship/:id",
          name: "InternshipApplicantList",
          component: () =>
            import("../components/Admin/InternshipApplicantItem.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "coordinator",
          name: "CoordinatorList",
          component: () => import("../components/Admin/CoordinatorList.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "coordinator/:id",
          name: "CoordinatorRequestItem",
          component: () =>
            import("../components/Admin/CoorRequestListItem.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "request",
          name: "CoordinatorRequest",
          component: () => import("../components/Admin/CoorRequestList.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "announcement",
          name: "admin_announcement",
          component: () => import("../components/Admin/Announce.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
        {
          path: "communication/messenger",
          name: "admin_messenger",
          component: () => import("../components/Admin/Messenger.vue"),
          meta: { requiresAuth: true, roles: ["Admin"] },
        },
      ],
    },
    {
      path: "/coor",
      redirect: "/coor/auth",
    },

    {
      path: "/coor/dashboard",
      component: CoorDashBoardView,
      meta: { requiresAuth: true, roles: ["Coordinator"] },
      children: [
        {
          path: "",
          name: "coor_dashboard",
          component: CoorDashBoard,
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
        {
          path: "settings",
          name: "CoorSettings",
          component: () => import("../components/Coor/CoorSettings.vue"),
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
        {
          path: "list",
          name: "InternDepartmentList",
          component: () =>
            import("../components/Coor/InternDepartmentList.vue"),
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
        {
          path: "hte",
          name: "HteList",
          component: () => import("../components/Coor/hteList.vue"),
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
        {
          path: "requests",
          name: "CoorRequest",
          component: () =>
            import("../components/Coor/VisitationRequestList.vue"),
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
        {
          path: "announcement",
          name: "coor_announcement",
          component: () => import("../components/Coor/CoorAnnounce.vue"),
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
        {
          path: "messenger",
          name: "coor_messenger",
          component: () => import("../components/Coor/Messenger.vue"),
          meta: { requiresAuth: true, roles: ["Coordinator"] },
        },
      ],
    },
    // HTE
    {
      path: "/hte",
      redirect: "/hte/auth",
    },

    {
      path: "/hte/dashboard",
      component: HTEDashBoardView,
      meta: { requiresAuth: true, roles: ["HTE"] },
      children: [
        {
          path: "",
          name: "hte_dashboard",
          component: () => import("../components/Hte/Dashboard.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "profile",
          name: "hte_profile",
          component: () => import("../components/Hte/HteProfile.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "settings",
          name: "hte_settings",
          component: () => import("../components/Hte/HteSettings.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "internships",
          name: "hte_vacancy",
          component: HTEInternshipsList,
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "internships/:jobId",
          name: "InternshipItem",
          component: () => import("../components/Hte/InternshipItem.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "applicants",
          name: "ApplicantsList",
          component: () => import("../components/Hte/ApplicationList.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "accepted_applicants",
          name: "AcceptedList",
          component: () => import("../components/Hte/AcceptedInterns.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "accepted_applicants/:internId",
          name: "DailyTimeRecord",
          component: () => import("../components/Hte/DailyTimeRecord.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "monitoring",
          name: "InternMonitoring",
          component: () => import("../components/Hte/InternMonitoring.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "request",
          name: "VisitRequest",
          component: () => import("../components/Hte/RequestList.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "evaluation",
          name: "Evaluation",
          component: () => import("../components/Hte/Evaluation.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "evaluation/:id",
          name: "EvaluationView",
          component: () => import("../components/EvaluationView.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "evaluationForm/:id",
          name: "EvaluationForm",
          component: () => import("../components/Hte/EvaluationForm.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
        {
          path: "messenger",
          name: "hte_messenger",
          component: () => import("../components/Hte/Messenger.vue"),
          meta: { requiresAuth: true, roles: ["HTE"] },
        },
      ],
    },
    // Student
    {
      path: "/intern",
      redirect: "/intern/auth",
    },

    {
      path: "/student/dashboard",
      component: StudentDashBoardView,
      meta: { requiresAuth: true, roles: ["Intern"] },
      children: [
        {
          path: "",
          name: "student_dashboard",
          component: StudentDashboard,
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "profile",
          name: "intern_profile",
          component: () => import("../components/Student/Profile.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "settings",
          name: "intern_settings",
          component: () => import("../components/Student/InternSettings.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "internships",
          name: "internships_list",
          component: StudentInternshipsList,
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "internships/:id",
          name: "InternApplication",
          component: () =>
            import("../components/Student/InternApplication.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "internships/information/:id",
          name: "HteInformation",
          component: () => import("../components/Student/HteInformation.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "status",
          name: "ApplicationStatus",
          component: () =>
            import("../components/Student/ApplicationStatus.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "status/:id",
          name: "ApplicationUpdate",
          component: () =>
            import("../components/Student/InternApplicationUpdateForm.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "dtr",
          name: "DTR",
          component: () => import("../components/Student/DTR.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "logs",
          name: "Logsheets",
          component: () => import("../components/Student/InternAttendance.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
        {
          path: "messenger",
          name: "student_messenger",
          component: () => import("../components/Student/Messenger.vue"),
          meta: { requiresAuth: true, roles: ["Intern"] },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log("test");

  const authStore = useAuthStore();
  await authStore.checkAuth();
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated && to.meta.roles.includes("Admin")) {
      next({ name: "student_auth" });
    } else if (!authStore.isAuthenticated && to.meta.roles.includes("HTE")) {
      next({ name: "student_auth" });
    } else if (!authStore.isAuthenticated && to.meta.roles.includes("Intern")) {
      next({ name: "student_auth" });
    } else if (
      !authStore.isAuthenticated &&
      to.meta.roles.includes("Coordinator")
    ) {
      next({ name: "student_auth" });
    } else if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)) {
      next({ name: "home" });
    } else {
      next();
    }
  } else if (
    !to.meta.requiresAuth &&
    authStore.isAuthenticated &&
    authStore.userRole === "Admin"
  ) {
    next({ name: "admin_dashboard" });
  } else if (
    !to.meta.requiresAuth &&
    authStore.isAuthenticated &&
    authStore.userRole === "HTE"
  ) {
    next({ name: "hte_dashboard" });
  } else if (
    !to.meta.requiresAuth &&
    authStore.isAuthenticated &&
    authStore.userRole === "Coordinator"
  ) {
    next({ name: "coor_dashboard" });
  } else if (
    !to.meta.requiresAuth &&
    authStore.isAuthenticated &&
    authStore.userRole === "Intern"
  ) {
    next({ name: "student_dashboard" });
  } else {
    next();
  }
});

export default router;
