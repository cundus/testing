import React from 'react';

// React Lazy
import Lazyload from '../../components/lazyLoad';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layout';
// import PlanningPage from '../../pages/planning';
// import Clear from '../../layout/clear';

// Shared Pages
const HomePage = React.lazy(() => import('../../pages/home/home'));
const PlanningPage = React.lazy(() => import('../../pages/planning'));
const MyKpiPage = React.lazy(() => import('../../pages/planning/my-kpi/my-kpi'));
const EditMyKpiPage = React.lazy(() => import('../../pages/planning/my-kpi/edit-my-kpi'));
const MyTeamPlaningPAge = React.lazy(() => import('../../pages/my-team/planning/planning'));
const MyTeamPlaningDetailPage = React.lazy(() => import('../../pages/my-team/planning/planning-detail'));
const MonitoringPage = React.lazy(() => import('../../pages/monitoring/index'));
const AppraisalPage = React.lazy(() => import('../../pages/Appraisal/index'));
const MonitoringTeamPage = React.lazy(() => import('../../pages/my-team/monitoring/monitoring'));
const AppraisalTeamPage = React.lazy(() => import('../../pages/my-team/appraisal/appraisal'));
export const routes = [
  {
    path: '/',
    title: 'Dashboard',
    exact: false,
    component: DashboardLayout,
    child: [
      {
        path: '/home',
        component: Lazyload(HomePage),
        title: 'Home',
        exact: true
      },
      {
        path: '/planning/create-planning',
        component: Lazyload(PlanningPage),
        exact: true,
        title: 'Planning'
      },
      {
        path: '/planning/kpi-planning',
        component: Lazyload(MyKpiPage),
        exact: true,
        title: 'KPI Planning'
      },
      {
        path: '/planning/kpi-planning/edit',
        component: Lazyload(EditMyKpiPage),
        exact: true,
        title: 'Edit Kpi Planning'
      },
      {
        path: '/my-team/planning/',
        component: Lazyload(MyTeamPlaningPAge),
        exact: true,
        title: 'Planning'
      },
      {
        path: '/my-team/planning/:id',
        component: Lazyload(MyTeamPlaningDetailPage),
        exact: true,
        title: 'Planning Detail'
      },
      {
        path: '/my-team/monitoring',
        component: Lazyload(MonitoringTeamPage),
        exact: true,
        title: 'Monitoring'
      },
      {
        path: '/my-team/appraisal',
        component: Lazyload(AppraisalTeamPage),
        exact: true,
        title: 'Appraisal'
      },
      {
        path: '/monitoring',
        component: Lazyload(MonitoringPage),
        exact: true,
        title: 'Monitoring'
      },
      {
        path: '/appraisal',
        component: Lazyload(AppraisalPage),
        exact: true,
        title: 'Appraisal'
      }
    ]
  }
];
export default routes;
