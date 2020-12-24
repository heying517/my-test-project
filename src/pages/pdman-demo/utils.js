/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export function getMax(data) {
  let max = 0;
  let isHaveNotNull = false;
  const showKey = ["name", "type", "notNull"];
  for (let i = 0; i < data.length; i += 1) {
    let sum = 0;
    for (const key in data[i]) {
      if (showKey.includes(key) && data[i][key]) {
        let value = data[i][key];
        if (typeof value !== "string") {
          value = value.toString();
          if (key === "notNull") {
            isHaveNotNull = true;
          }
        }
        sum += value.length;
      }
    }
    if (sum > max) {
      max = sum;
    }
  }
  return {
    max,
    maxNameType: isHaveNotNull ? max - 4 : max,
  };
}
