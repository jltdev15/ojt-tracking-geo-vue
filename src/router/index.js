import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Users from "@/components/Admin/Users.vue";
import AdminDashBoardView from "../views/Admin/AdminDashBoardView.vue";
import AdminDashboard from "@/components/Admin/Dashboard.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
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
      path: "/student",
      redirect: "/student/auth",
    },
    {
      path: "/student/auth",
      name: "student_auth",
      component: () => import("../views/Student/StudentAuthView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminDashBoardView,
      children: [
        {
          path: "dashboard",
          name: "admin_dashboard",
          component: AdminDashboard,
        },
        {
          path: "users",
          name: "users",
          component: Users,
        },
      ],
    },
    // {
    //   path: '/intern/auth',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/hte/auth',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/hte/auth',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
