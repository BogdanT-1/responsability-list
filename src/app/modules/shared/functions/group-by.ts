export function groupBy(array: any, key: any) {
  return array.reduce(function(currElement: any, x: any) {
    (currElement[x[key]] = currElement[x[key]] || []).push(x);
    return currElement;
  }, {});
};
