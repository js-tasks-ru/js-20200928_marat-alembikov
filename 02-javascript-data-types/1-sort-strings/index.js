/*
 * Решение 1:
 * Создаем 2 (русский и английский) алфавита и сравниваем
 * является ли подстрока частью алфавита
 */
// let russianAlphabet = "";
// let englishAlphabet = "";

// for (let i = 65; i <= 220; i++) {
//   englishAlphabet += String.fromCodePoint(i);
// }

// for (let i = 1025; i <= 1105; i++) {
//   russianAlphabet += String.fromCodePoint(i);
// }

// /**
//  * sortStrings - sorts array of string by two criteria "asc" or "desc"
//  * @param {string[]} arr - the array of strings
//  * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
//  * @returns {string[]}
//  */
// export function sortStrings(arr, param = "asc") {
//   const newArr = [...arr];

//   const sortedArr = newArr.sort((a, b) => {
//     if (russianAlphabet.includes(a[0]) && russianAlphabet.includes(b[0])) {
//       return a.localeCompare(b, "ru", { caseFirst: "upper" });
//     }

//     if (englishAlphabet.includes(a[0]) && englishAlphabet.includes(b[0])) {
//       return a.localeCompare(b, "en", { caseFirst: "upper" });
//     }

//     return a.localeCompare(b);
//   });

//   if (param === "asc") {
//     return sortedArr;
//   }

//   Переворачиваем весь массив если "desc"
//   return sortedArr.reverse();
// }

/*
 * Решение 2:
 * Передаем undefined в locale
 * и используем только необходимое нам правило { caseFirst: "upper" }
 */

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const newArr = [...arr];

  return newArr.sort((a, b) => {
    /*
     * Так как Array.reverse() вызовет дополнительный проход по массиву,
     * то поменяем переменные местами
     */
    if (param === "desc") {
      [a, b] = [b, a];
    }

    return a.localeCompare(b, undefined, { caseFirst: "upper" });
  });
}
