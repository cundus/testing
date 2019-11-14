import {
    Home  as HomePage,
    CreatePlanning as CreatePlanningPage
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
      path: '/planning/',
      component: CreatePlanningPage,
      exact: true,
      menuLevel: 1,
      name: 'planning',
      viewName: 'Planning',
      parent: 'none',
    },
    {
      path: '/planning/create-planning',
      component: CreatePlanningPage,
      exact: true,
      menuLevel: 2,
      name: 'create-planning',
      viewName: 'Create KPI',
      parent: 'planning',
      icon: 'plus-circle',
      theme: 'filled'
    },
    {
      path: '/planning/create-non-kpi-planning',
      component: CreatePlanningPage,
      exact: true,
      menuLevel: 2,
      name: 'create-non-kpi-planning',
      viewName: 'Create Non KPI',
      parent: 'planning',
      icon: 'plus-circle',
      theme: 'outlined'
    },
    {
      path: '/planning/kpi-planning',
      component: CreatePlanningPage,
      exact: true,
      menuLevel: 2,
      name: 'kpi-planning',
      viewName: 'View My KPI',
      parent: 'planning',
      icon: 'search',
      theme: 'outlined'
    }
];

export default Routes;