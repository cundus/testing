const MenuList = [
  {
    id: 1,
    path: '/home',
    title: 'Home',
    menuLevel: 1,
    parent: 'none'
  },
  {
    id: 2,
    path: '/planning/',
    menuLevel: 1,
    title: 'Planning',
    parent: 'none'
  },
  {
    id: 3,
    path: '/planning/kpi',
    menuLevel: 2,
    title: 'Create KPI',
    parent: 'Planning',
    icon: 'plus-circle',
    theme: 'filled'
  },
  // {
  //   id: 4,
  //   path: '/planning/kpi-planning',
  //   menuLevel: 2,
  //   title: 'View My KPI',
  //   parent: 'Planning',
  //   icon: 'search',
  //   theme: 'outlined'
  // },
  {
    id: 5,
    path: '/monitoring',
    menuLevel: 1,
    title: 'Monitoring',
    parent: 'none',
    theme: 'outlined'
  },
  {
    id: 7,
    path: '/appraisal',
    menuLevel: 1,
    title: 'Appraisal',
    parent: 'none',
    theme: 'outlined'
  },
  {
    id: 8,
    path: '/my-team/',
    menuLevel: 1,
    title: 'My Team',
    parent: 'none'
  },
  {
    id: 9,
    path: '/my-team/planning/',
    menuLevel: 2,
    title: 'Planning',
    parent: 'My Team',
    icon: 'calendar',
    theme: 'outlined',
    manager: true
  },
  {
    id: 10,
    path: '/my-team/monitoring/',
    menuLevel: 2,
    title: 'Monitoring',
    parent: 'My Team',
    icon: 'stock',
    theme: 'outlined',
    manager: true
  },
  {
    id: 11,
    path: '/my-team/appraisal/',
    menuLevel: 2,
    title: 'Appraisal',
    parent: 'My Team',
    icon: 'check-square',
    theme: 'outlined',
    manager: true
  },
  {
    id: 12,
    path: '/my-team/performance-review-alignment/',
    menuLevel: 2,
    title: 'Performance Review Alignment',
    parent: 'My Team',
    icon: 'pie-chart',
    theme: 'outlined',
    disabled: true,
    employee: true
  },
  {
    id: 13,
    path: '/my-team/previous-kpi/',
    menuLevel: 2,
    title: 'Previous KPI',
    parent: 'My Team',
    icon: 'bar-chart',
    theme: 'outlined',
    manager: true
  },
  {
    id: 14,
    path: '/previous-kpi',
    menuLevel: 1,
    title: 'Previous KPI',
    parent: 'none',
    theme: 'outlined'
  },
];

export default MenuList;
