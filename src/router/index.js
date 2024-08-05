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
          component: HTEDashboard,
          meta: { requiresAuth: true, roles: ['HTE'] },
        },
        {
          path: "internships",
          name: "hte_vacancy",
          component: HTEInternshipsList,
          meta: { requiresAuth: true, roles: ['HTE'] },
        },

      ],
    },
    // Student
    {
      path: "/student",
      redirect: "/student/auth",
    },
    {
      path: "/student/auth",
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


      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'home' });
  } else if (to.meta.roles && !to.meta.roles.some(role => authStore.user?.includes(role))) {
    console.log('test 1')
    if(authStore.user === 'Admin') return next({name:'admin_dashboard'})
    if(authStore.user === 'HTE') return next({name:'hte_dashboard'})
    if(authStore.user === 'Intern') return next({name:'student_dashboard'})
  }  else if(authStore.isAuthenticated && to.name === 'admin_auth') {
    console.log('test 2');
    next({name:'admin_dashboard'});
  } else {
    next()
  }



})

export default router;
