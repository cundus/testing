const MenuList = [
  {
    id: 1,
    path: '/home',
    title: 'Home',
    menuLevel: 1,
    parent: 'none',
  },
  {
    id: 2,
    path: '/planning/',
    menuLevel: 1,
    title: 'Planning',
    parent: 'none',
  },
  {
    id: 3,
    path: '/planning/create-planning',
    menuLevel: 2,
    title: 'Create KPI',
    parent: 'Planning',
    icon: 'plus-circle',
    theme: 'filled'
  },
  {
    id: 4,
    path: '/planning/create-non-kpi-planning',
    menuLevel: 2,
    title: 'Create Non KPI',
    parent: 'Planning',
    icon: 'plus-circle',
    theme: 'outlined'
  },
  {
    id: 5,
    path: '/planning/kpi-planning',
    menuLevel: 2,
    title: 'View My KPI',
    parent: 'Planning',
    icon: 'search',
    theme: 'outlined'
  }];

export default MenuList;
