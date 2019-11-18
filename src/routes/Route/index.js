import React from "react";

// React Lazy
import Lazyload from "../../components/lazyLoad";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layout";
import Clear from "../../layout/clear";

// Shared Pages
const HomePage = React.lazy(() => import("../../pages/home/home"));
const CreatePlanningPage = React.lazy(() => import("../../pages/planning/"));
const MyKpiPage = React.lazy(()=> import ('../../pages/planning/my-kpi/my-kpi'));
const EditMyKpiPage = React.lazy(()=> import ('../../pages/planning/my-kpi/edit-my-kpi'));
const DrafKPIPage =  React.lazy(()=> import ('../../pages/planning/draf/draf-kpi'));
const SubmitedKPIPage = React.lazy(()=> import('../../pages/planning/submited-kpi/submited-kpi'));
const MyTeamPlaningPAge = React.lazy(()=> import('../../pages/my-team/planning/planning'));
export const routes = [
  {
    path: "/",
    exact: false,
    title: "Root",
    component: Clear,
    child: [
      {
        path: "/",
        title: "Dashboard",
        exact: false,
        component: DashboardLayout,
        child: [
          {
            path: "/home",
            component: Lazyload(HomePage),
            title: "Home",
            exact: true
          },
          {
            path: "/planning/create-planning",
            component: Lazyload(CreatePlanningPage),
            exact: true,
            title: "Planning"
          },
          {
            path: "/planning/create-non-kpi-planning",
            component: Lazyload(CreatePlanningPage),
            exact: true,
            title: "Create Non KPI Planning"
          },
          {
            path: "/planning/kpi-planning",
            component: Lazyload(MyKpiPage),
            exact: true,
            title: "KPI Planning"
          },
          {
            path: "/planning/kpi-planning/edit",
            component: Lazyload(EditMyKpiPage),
            exact: true,
            title: "Edit Kpi Planning"
          },
          {
            path: '/planning/draf/kpi',
            component: Lazyload(DrafKPIPage),
            exact: true,
            title: "Draf KPI"
          },
          {
            path: '/planning/submited/kpi',
            component: Lazyload(SubmitedKPIPage),
            exact: true,
            title: "Submited KPI"
          },
          {
            path: '/my-team/planning/',
            component: Lazyload(MyTeamPlaningPAge),
            exact: true,
            title: "Planning"
          },
        ]
      } /*, {
    path: '/',
    title: 'Login',
    exact: true,
    component: Lazyload(Login)
  }*/
    ]
  }
];

export default routes;
