function sortBy(key, cb) {
  if (!cb) cb = () => 0;
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(a, b));
}

function sortByDesc(key, cb) {
  if (!cb) cb = () => 0;
  return (b, a) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : cb(b, a));
}

export function orderBy(datas, keys, orders) {
  let cb = () => 0;
  keys.reverse();
  orders.reverse();
  for (const [i, key] of keys.entries()) {
    const order = orders[i];
    if (order === "asc") {
      cb = sortBy(key, cb);
    } else if (order === "desc") {
      cb = sortByDesc(key, cb);
    } else {
      throw new Error(`Unsupported order "${order}"`);
    }
  }
  return datas.sort(cb);
}
export const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === "function" ? predicate : (o) => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

export const qs = (params) =>
  Object.keys(params)
    .filter((key) => params[key])
    .map((key) => `${key}=${params[key]}`)
    .join("&");

export const currentStepFilterParams = (params) => {
  if (params.includes("currentStep")){
    return `${params}&sort=formDataStatus,desc`
  }
  return params
}
