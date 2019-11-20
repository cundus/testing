import React from 'react';

// React Lazy
import Lazyload from '../../components/lazyLoad';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layout';
import PlanningPage from '../../pages/planning';
import Clear from '../../layout/clear';

// Shared Pages
const HomePage = React.lazy(() => import('../../pages/home/home'));
const CreatePlanningPage = React.lazy(() =>
  import('../../pages/planning/create-kpi')
);
const DraftKPIPage = React.lazy(() => import('../../pages/planning/draft-kpi'));
const MyKpiPage = React.lazy(() =>
  import('../../pages/planning/my-kpi/my-kpi')
);
const EditMyKpiPage = React.lazy(() =>
  import('../../pages/planning/my-kpi/edit-my-kpi')
);
const SubmitedKPIPage = React.lazy(() =>
  import('../../pages/planning/submited-kpi')
);
const MyTeamPlaningPAge = React.lazy(() =>
  import('../../pages/my-team/planning/planning')
);
const MyTeamPlaningDetailPage = React.lazy(() =>
  import('../../pages/my-team/planning/planning-detail')
);

export const routes = [
  {
    path: '/',
    exact: false,
    title: 'Root',
    component: Clear,
    child: [
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
            path: '/planning/kpi',
            component: PlanningPage,
            exact: false,
            title: 'Planning',
            child: [
              {
                path: '/planning/kpi/create-planning',
                component: Lazyload(CreatePlanningPage),
                exact: true,
                title: 'Create KPI'
              },
              {
                path: '/planning/kpi/draft-planning',
                component: Lazyload(DraftKPIPage),
                exact: true,
                title: 'Draft KPI'
              },
              {
                path: '/planning/kpi/submit-planning',
                component: Lazyload(SubmitedKPIPage),
                exact: true,
                title: 'Draft KPI'
              }
            ]
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
          }
        ]
      }
    ]
  }
];
export default routes;
