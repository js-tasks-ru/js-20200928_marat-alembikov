/**
 * sum
 * @param {number} m base
 * @param {number} n index
 * @returns {number}
 */

function isNumber(num) {
  return typeof num === "number";
}

export default function sum(m, n) {
  if (![m, n].every(isNumber)) {
    throw new Error("Переданный аргумент не является числом!");
  }

  return m + n;
}
