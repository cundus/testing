import {
    Home  as HomePage,
    CreateKPI as CreateKpiPage,
    DrafKPI as DrafKPIPage,
    SubmitedKPI  as SubmitedKPIPage,
    MyKPI  as MyKPIPage,
    EditMyKPI  as EditMyKPIPage
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
      component: CreateKpiPage,
      exact: true,
      menuLevel: 1,
      name: 'planning',
      viewName: 'Planning',
      parent: 'none',
    },
    {
      path: '/planning/create-planning',
      component: CreateKpiPage,
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
      component: CreateKpiPage,
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
      component: MyKPIPage,
      exact: true,
      menuLevel: 2,
      name: 'kpi-planning',
      viewName: 'View My KPI',
      parent: 'planning',
      icon: 'search',
      theme: 'outlined'
    },
    {
      path: '/planning/kpi-planning/edit',
      component: EditMyKPIPage,
      exact: true,
      menuLevel: -1,
      name: 'kpi-planning',
    },
    {
      path: '/planning/draf/kpi',
      component: DrafKPIPage,
      exact: true,
      menuLevel: -1,
    },
    {
      path: '/planning/submited/kpi',
      component: SubmitedKPIPage,
      exact: true,
      menuLevel: -1,
    }
];

export default Routes;