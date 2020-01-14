import React from 'react';

// React Lazy
import Lazyload from '../../components/lazyLoad';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layout';
import { LazyLoad } from '../../components';
// import PlanningPage from '../../pages/planning';
// import Clear from '../../layout/clear';

// Shared Pages
const HomePage = React.lazy(() => import('../../pages/home/home'));
const PlanningPage = React.lazy(() => import('../../pages/planning'));
// const MyKpiPage = React.lazy(() => import('../../pages/planning/my-kpi/my-kpi'));
// const EditMyKpiPage = React.lazy(() => import('../../pages/planning/my-kpi/edit-my-kpi'));
const MyTeamPlaningPAge = React.lazy(() => import('../../pages/my-team/planning/planning'));
const MyTeamPlaningDetailPage = React.lazy(() => import('../../pages/my-team/planning/planning-detail'));
const MonitoringPage = React.lazy(() => import('../../pages/monitoring/index'));
const AppraisalPage = React.lazy(() => import('../../pages/Appraisal/index'));
const MonitoringTeamPage = React.lazy(() => import('../../pages/my-team/monitoring/monitoring'));
const AppraisalTeamPage = React.lazy(() => import('../../pages/my-team/appraisal/appraisal'));
const Error500Page = React.lazy(() => import('../../pages/error/page500'));
const AddKpiMonitoring = React.lazy(() => import('../../pages/monitoring/addkpi/addkpi'));
const ActivityPage = React.lazy(()=> import('../../pages/activity/index'));
const ChatActivityPage = React.lazy(()=> import('../../pages/activity/chat'));

export const routes = [
  {
    path: '/',
    title: 'Dashboard',
    exact: false,
    component: DashboardLayout,
    child: [
      {
        path: '/',
        component: Lazyload(HomePage),
        title: 'Home',
        exact:  true
      },
      {
        path: '/home',
        component: Lazyload(HomePage),
        title: 'Home',
        exact: true
      },
      {
        path: '/planning/kpi',
        component: Lazyload(PlanningPage),
        exact: true,
        title: 'Planning'
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
        path: '/Activity/:idActivity/',
        component: LazyLoad(ActivityPage),
        exact: true,
        title: 'Activity'
      },
      {
        path: '/Activity/Chat/:idActivity/:idThread',
        exact: true,
        component: LazyLoad(ChatActivityPage),
        title: 'Activity Chat'
      },
      {
        path: '/monitoring/add',
        component: Lazyload(AddKpiMonitoring),
        exact: true,
        title: 'ADD KPI Monitoring'
      },
      {
        path: '/appraisal',
        component: Lazyload(AppraisalPage),
        exact: true,
        title: 'Appraisal'
      },
      {
        path: '/500',
        component: Lazyload(Error500Page),
        exact: true,
        title: 'Error 500'
      }
    ]
  }
];
export default routes;
