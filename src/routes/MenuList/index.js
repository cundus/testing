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
    path: '/planning/kpi/create-planning',
    menuLevel: 2,
    title: 'Create KPI',
    parent: 'Planning',
    icon: 'plus-circle',
    theme: 'filled'
  },
  {
    id: 4,
    path: '/planning/kpi-planning',
    menuLevel: 2,
    title: 'View My KPI',
    parent: 'Planning',
    icon: 'search',
    theme: 'outlined'
  },
  {
    id: 5,
    path: '/my-team/',
    menuLevel: 1,
    title: 'My Team',
    parent: 'none'
  },
  {
    id: 6,
    path: '/my-team/planning/',
    menuLevel: 2,
    title: 'Planning',
    parent: 'My Team',
    icon: 'calendar',
    theme: 'outlined'
  }
];

export default MenuList;
