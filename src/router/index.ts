import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import UsersPage from '@/views/admin/UsersPage.vue'
import DashboardPage from '@/views/admin/DashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: DashboardPage,
        },
        {
          path: 'users',
          name: 'admin-users',
          component: UsersPage,
        },
        {
          path: 'projects',
          name: 'admin-projects',
          component: () => import('@/views/admin/ProjectsPage.vue'),
        },
        {
          path: 'tasks',
          name: 'admin-tasks',
          component: () => import('@/views/admin/TasksPage.vue'),
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@/views/admin/SettingsPage.vue'),
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('@/views/admin/ProfilePage.vue'),
        },
        {
          path: 'roles',
          name: 'admin-roles',
          component: () => import('@/views/admin/RolesPage.vue'),
        },
        {
          path: 'permissions',
          name: 'admin-permissions',
          component: () => import('@/views/admin/PermissionsPage.vue'),
        },
        {
          path: 'test-table',
          name: 'admin-test-table',
          component: () => import('@/views/admin/TestTablePage.vue'),
        },
      ],
    },
  ],
})

export default router