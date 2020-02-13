import { managerRoute, empRoute } from './listStepRouter';

const navigatorManager = (currentStep, userId) => {
  let route = '';
  managerRoute.map((item, index) => {
    if (item.step.includes(currentStep)) {
      route = item.route + userId;
      return route;
    }
    return route;
  });
  return route;
};

const navigatorEmp = (currentStep) => {
  let route = '';
  empRoute.map((item, index) => {
    if (item.step.includes(currentStep)) {
      route = item.route;
      return route;
    }
    return route;
  });
  return route;
};

export {
  navigatorManager,
  navigatorEmp
};
