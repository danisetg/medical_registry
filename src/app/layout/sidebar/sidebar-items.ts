import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Home',
    icon: 'fas fa-home',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/dashboard/main',
        title: 'Dashboard 1',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },

  {
    path: '',
    title: 'Authentication',
    icon: 'fas fa-id-card',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/authentication/signin',
        title: 'Sign In',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/authentication/signup',
        title: 'Sign Up',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Multi level Menu',
    icon: 'fas fa-angle-double-down',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '#',
        title: 'First',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/',
        title: 'Second',
        icon: '',
        class: 'ml-sub-menu',
        groupTitle: false,
        submenu: [
          {
            path: '/',
            title: 'Second 1',
            icon: '',
            class: '',
            groupTitle: false,
            submenu: []
          },
          {
            path: '/',
            title: 'Second 2',
            icon: '',
            class: '',
            groupTitle: false,
            submenu: []
          }
        ]
      },
      {
        path: '#',
        title: 'Third',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      }
    ]
  }
];
