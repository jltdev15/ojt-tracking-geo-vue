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
import { useAuthStore } from "@/stores/AuthStore";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false, roles: [''] },
    },
    // Admin
    {
      path: "/admin",
      redirect: "/admin/auth",
    },
    {
      path: "/admin/auth",
      name: "admin_auth",
      component: () => import("../views/Admin/AdminAuthView.vue"),
    },
    {
      path: "/admin/dashboard",
      component: AdminDashBoardView,
      meta: { requiresAuth: true, roles: ['Admin'] },
      children: [
        {
          path: "",
          name: "admin_dashboard",
          component: AdminDashboard,
          meta: { requiresAuth: true, roles: ['Admin'] }
       
        },
        {
          path: "manage-users",
          name: "manage_users",
          component: () => import("../components/Admin/Users.vue"),
          meta: { requiresAuth: true, roles: ['Admin'] }
        },
      ],
    },
    // HTE
    {
      path: "/hte",
      redirect: '/hte/auth'
    },
    {
      path: "/hte/auth",
      name: "hte_auth",
      component: () => import("../views/HTE/HTEAuthView.vue"),
    },
    {
      path: "/hte/dashboard",
      component: HTEDashBoardView,
      meta: { requiresAuth: true, roles: ['HTE'] },
      children: [
        {
          path: "",
          name: "hte_dashboard",
          component: () => import("../components/Hte/Dashboard.vue"),
          meta: { requiresAuth: true, roles: ['HTE'] },
        },
        {
          path: "internships",
          name: "hte_vacancy",
          component: HTEInternshipsList,
          meta: { requiresAuth: true, roles: ['HTE'] },
        },
        {
          path: "internships/:jobId",
          name: "InternshipItem",
          component: () => import("../components/Hte/InternshipItem.vue"),
          meta: { requiresAuth: true, roles: ['HTE'] },
        },
        {
          path: "applicants",
          name: "ApplicantsList",
          component: () => import("../components/Hte/ApplicationList.vue"),
          meta: { requiresAuth: true, roles: ['HTE'] },
        },

      ],
    },
    // Student
    {
      path: "/intern",
      redirect: "/intern/auth",
    },
    {
      path: "/intern/auth",
      name: "student_auth",
      component: () => import("../views/Student/StudentAuthView.vue"),
    },
    {
      path: "/student/dashboard",
      component: StudentDashBoardView,
      meta: { requiresAuth: true, roles: ['Intern'] },
      children: [
        {
          path: "",
          name: "student_dashboard",
          component: StudentDashboard,
          meta: { requiresAuth: true, roles: ['Intern'] },
        },
        {
          path: "internships",
          name: "internships_list",
          component: StudentInternshipsList,
          meta: { requiresAuth: true, roles: ['Intern'] },

        },
        {
          path: "internships/:id",
          name: "InternApplication",
         component: () => import("../components/Student/InternApplication.vue"),
          meta: { requiresAuth: true, roles: ['Intern'] },

        },
        {
          path: "status",
          name: "ApplicationStatus",
         component: () => import("../components/Student/ApplicationStatus.vue"),
          meta: { requiresAuth: true, roles: ['Intern'] },

        },


      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth()
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated && to.meta.roles.includes('Admin')) {
      next({ name: 'admin_auth' });
    }else if(!authStore.isAuthenticated && to.meta.roles.includes('HTE')){
      next({ name: 'hte_auth' });
    } 
    else if(!authStore.isAuthenticated && to.meta.roles.includes('HTE')){
      next({ name: 'student_auth' });
    }
    else if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else if(!to.meta.requiresAuth && authStore.isAuthenticated && authStore.userRole === 'Admin') {
    next({name:'admin_dashboard'})
  }else if(!to.meta.requiresAuth && authStore.isAuthenticated && authStore.userRole === 'HTE') {
    next({name:'hte_dashboard'})
  }
  else if(!to.meta.requiresAuth && authStore.isAuthenticated && authStore.userRole === 'Intern') {
    next({name:'student_dashboard'})
  }
  else{
    next();
  }




})

export default router;
