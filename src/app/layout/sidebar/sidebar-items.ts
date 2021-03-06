import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Home',
    icon: 'fas fa-home',
    class: '',
    allowedRoles: ["patient", "doctor"],
    submenu: []
  },
  {
    path: '/doctors/list',
    title: 'Doctors',
    icon: 'fas fa-user-md',
    class: '',
    allowedRoles: ["patient", "doctor"],
    submenu: []
  },
  {
    path: '/patients/list',
    title: 'Patients',
    icon: 'fab fa-accessible-icon',
    class: '',
    allowedRoles: ["doctor"],
    submenu: []
  }
];
