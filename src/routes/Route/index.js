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
const PreviousKPI = React.lazy(() => import('../../pages/previous'));
const MyTeamPreviousKPI = React.lazy(() => import('../../pages/my-team/previousKPI/alignmentList'));
const AlignmentList = React.lazy(() => import('../../pages/my-team/alignment/alignmentList'));
const AlignmentDetail = React.lazy(() => import('../../pages/my-team/alignment/alignmentDetail'));
// const MyKpiPage = React.lazy(() => import('../../pages/planning/my-kpi/my-kpi'));
// const EditMyKpiPage = React.lazy(() => import('../../pages/planning/my-kpi/edit-my-kpi'));
const MyTeamPlaningPage = React.lazy(() => import('../../pages/my-team/planning/planning'));
const MyTeamPlaningDetailPage = React.lazy(() => import('../../pages/my-team/planning/planning-detail'));
const MonitoringPage = React.lazy(() => import('../../pages/monitoring/index'));
const AppraisalPage = React.lazy(() => import('../../pages/Appraisal/index'));
const MonitoringTeamPage = React.lazy(() => import('../../pages/my-team/monitoring/monitoring'));
const AppraisalTeamPage = React.lazy(() => import('../../pages/my-team/appraisal/appraisal'));
const Error500Page = React.lazy(() => import('../../pages/error/page500'));
const AddKpiMonitoring = React.lazy(() => import('../../pages/monitoring/addkpi/addkpi'));
const ActivityPage = React.lazy(()=> import('../../pages/activity/index'));
const ChatActivityPage = React.lazy(()=> import('../../pages/activity/chat'));
const AchievementPage = React.lazy(() => import('../../pages/achievement/index'));
const AppraisalTeamPageDetail = React.lazy(() => import('../../pages/my-team/appraisal/appraisal-detail/Appraisal'));
const Download = React.lazy(() => import('../../pages/download'));

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
        path: '/planning',
        component: Lazyload(PlanningPage),
        exact: true,
        title: 'Planning'
      },
      {
        path: '/my-team/planning/',
        component: Lazyload(MyTeamPlaningPage),
        exact: true,
        title: 'My Team - Planning'
      },
      {
        path: '/my-team/planning/:id',
        component: Lazyload(MyTeamPlaningDetailPage),
        exact: true,
        title: 'My Team - Planning Detail'
      },
      {
        path: '/my-team/monitoring',
        component: Lazyload(MonitoringTeamPage),
        exact: true,
        title: 'My Team - Monitoring'
      },
      {
        path: '/my-team/monitoring/:userId',
        component: Lazyload(MonitoringPage),
        exact: true,
        title: 'My Team - Monitoring'
      },
      {
        path: '/my-team/appraisal',
        component: Lazyload(AppraisalTeamPage),
        exact: true,
        title: 'My Team - Appraisal'
      },
      {
        path: '/my-team/appraisal/:userId',
        component: Lazyload(AppraisalTeamPageDetail),
        exact: true,
        title: 'My Team - Monitoring'
      },
      {
        path: '/monitoring',
        component: Lazyload(MonitoringPage),
        exact: true,
        title: 'Monitoring'
      },
      {
        path: '/Activity/:idActivity/:userId',
        component: LazyLoad(ActivityPage),
        exact: true,
        title: 'My Team - Activity'
      },
      {
        path: '/Achievement/:idAchievement/:userId',
        component: LazyLoad(AchievementPage),
        exact: true,
        title: 'My Team - Achievement'
      },
      {
        path: '/Activity/Chat/:idActivity/:idThread/:userId',
        exact: true,
        component: LazyLoad(ChatActivityPage),
        title: 'My Team - Activity Chat'
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
      },
      {
        path: '/my-team/performance-review-alignment/',
        component: Lazyload(AlignmentList),
        exact: true,
        title: 'My Team - Appraisal'
      },
      {
        path: '/my-team/performance-review-alignment/:sessionId',
        component: Lazyload(AlignmentDetail),
        exact: true,
        title: 'My Team - Appraisal'
      },
      {
        path: '/b76607ac',
        component: Lazyload(Download),
        exact: true,
        title: 'Download'
      },
      {
        path: '/previous-kpi',
        component: Lazyload(PreviousKPI),
        exact: true,
        title: 'Previous KPI'
      },
      {
        path: '/my-team/previous-kpi',
        component: Lazyload(MyTeamPreviousKPI),
        exact: true,
        title: 'My Team - Appraisal'
      },
      {
        path: '/my-team/previous-kpi/:userId',
        component: Lazyload(PreviousKPI),
        exact: true,
        title: 'My Team - Appraisal'
      }
    ]
  }
];
export default routes;
