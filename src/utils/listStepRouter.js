const managerRoute = [
  {
    step: ['Manager Goal Review'],
    route: '/my-team/planning/'
  },
  {
    step: [
      'Performance Review Manager',
      'Compiling Process',
      'Manager Acknowledgement And 1:1 Meeting',
      'Emp Acknowledgement',
      'Completed'
    ],
    route: '/my-team/appraisal/'
  }
];

const empRoute = [
  {
    step: ['Emp Goal Setting', 'Manager Goal Review'],
    route: '/planning/kpi'
  },
  {
    step: [
      'Performance Review Employee',
      'Performance Review Manager',
      'Compiling Process',
      'Manager Acknowledgement And 1:1 Meeting',
      'Emp Acknowledgement',
      'Completed'
    ],
    route: '/appraisal'
  }
];

export { managerRoute, empRoute };
