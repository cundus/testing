import {
    Home  as HomePage,
    CreatePlaning as CreatePlaningPage
} from  './pages';

const Routes = [
    {
      path: '/home',
      component: HomePage,
      name:  'home',
      viewName: 'Home',
      exact: true,
      menuLevel: 1,
      parent: 'none',
    },
    {
      path: '/planing/',
      component: CreatePlaningPage,
      exact: true,
      menuLevel: 1,
      name: 'planing',
      viewName: 'Planning',
      parent: 'none',
    },
    {
      path: '/planing/create-planing',
      component: CreatePlaningPage,
      exact: true,
      menuLevel: 2,
      name: 'create-planing',
      viewName: 'Create KPI',
      parent: 'planing',
      icon: 'plus-circle',
      theme: 'filled'
    },
    {
      path: '/planing/create-non-kpi-planing',
      component: CreatePlaningPage,
      exact: true,
      menuLevel: 2,
      name: 'create-non-kpi-planing',
      viewName: 'Create Non KPI',
      parent: 'planing',
      icon: 'plus-circle',
      theme: 'outlined'
    },
    {
      path: '/planing/kpi-planing',
      component: CreatePlaningPage,
      exact: true,
      menuLevel: 2,
      name: 'kpi-planing',
      viewName: 'View My KPI',
      parent: 'planing',
      icon: 'search',
      theme: 'outlined'
    }
];

export default Routes;