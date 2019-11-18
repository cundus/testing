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
            path: "/planning/create-planning",
            component: Lazyload(CreatePlanningPage),
            exact: true,
            title: "Create Planning"
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
