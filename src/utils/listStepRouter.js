import {
  MANAGER_GOAL_REVIEW,
  EMP_GOAL_SETTING,
  PERFORMANCE_REVIEW_MANAGER,
  COMPILING_PROCESS,
  MANAGER_ACKNOWLEDMENT,
  EMP_ACKNOWLEDGEMENT,
  COMPLETED,
  PERFORMANCE_REVIEW_EMPLOYEE,
  PROGRESS_MONITORING_1,
  PROGRESS_MONITORING_2,
  PROGRESS_REVIEW_ALIGNMENT_1,
  PROGRESS_REVIEW_ALIGNMENT_2
} from './stepKpi'
const managerRoute = [
  {
    step: [MANAGER_GOAL_REVIEW],
    route: '/my-team/planning/'
  },
  {
    step: [
      PROGRESS_MONITORING_1,
      PROGRESS_MONITORING_2
    ],
    route: '/my-team/monitoring/'
  },
  {
    step: [
      PROGRESS_REVIEW_ALIGNMENT_1,
      PROGRESS_REVIEW_ALIGNMENT_2
    ],
    route: '/my-team/performance-review-employee/'
  },
  {
    step: [
      PERFORMANCE_REVIEW_MANAGER,
      COMPILING_PROCESS,
      MANAGER_ACKNOWLEDMENT,
      EMP_ACKNOWLEDGEMENT,
      COMPLETED
    ],
    route: '/my-team/appraisal/'
  }
];

const empRoute = [
  {
    step: [EMP_GOAL_SETTING, MANAGER_GOAL_REVIEW],
    route: '/planning'
  },
  {
    step: [
      PROGRESS_MONITORING_1,
      PROGRESS_MONITORING_2
    ],
    route: '/monitoring'
  },
  {
    step: [
      PERFORMANCE_REVIEW_EMPLOYEE,
      PERFORMANCE_REVIEW_MANAGER,
      COMPILING_PROCESS,
      MANAGER_ACKNOWLEDMENT,
      EMP_ACKNOWLEDGEMENT,
      COMPLETED
    ],
    route: '/appraisal'
  }
];

export { managerRoute, empRoute };
