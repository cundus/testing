import React from "react";

// React Lazy
import Lazyload from "../../components/lazyLoad";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layout";
import Clear from "../../layout/clear";

// Shared Pages
const HomePage = React.lazy(() => import("../../pages/home/home"));
const CreatePlanningPage = React.lazy(() => import("../../pages/planning/"));

export const routes = [
  {
    path: "/",
    exact: false,
    title: "Root",
    component: Clear,
    child: [
      {
        path: "/dashboard",
        title: "Dashboard",
        exact: false,
        component: DashboardLayout,
        child: [
          {
            path: "/dashboard/home",
            component: Lazyload(HomePage),
            title: "Home",
            exact: true
          },
          {
            path: "/dashboard/planning/create-planning",
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
            component: Lazyload(CreatePlanningPage),
            exact: true,
            title: "KPI Planning"
          }
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
