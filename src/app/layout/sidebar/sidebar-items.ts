import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Home',
    icon: 'fas fa-home',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/doctors/list',
    title: 'Doctors',
    icon: 'fas fa-user-md',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/patients/list',
    title: 'Patients',
    icon: 'fab fa-accessible-icon',
    class: '',
    groupTitle: false,
    submenu: []
  }
];
