console.log("Hello World!");

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector("facts-list");

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

/*

function tinh_tuoi(age) {
  const currentYear = new Date().getFullYear();
  return (result = currentYear - age);
}

console.log(tinh_tuoi(2003));

function so_sanh_tuoi(age_1, age_2) {
  if (age_1 > age_2) return `Dong > Tai ${age_1 - age_2} tuoi`;
  else if (age_2 > age_1) return `Tai > Dong ${age_2 - age_1} tuổi`;
}

console.log(so_sanh_tuoi(2003, 2001));

const text = "bùi văn đồng";
const upperText = text.toUpperCase(text);
console.log(upperText);

const str = `The current fact is ${text}`;
console.log(str);

const calcAge2 = (year) => new Date().getFullYear() - year;
console.log(calcAge2(2003));

const fact = ["Phu Yen Que Toi", 2003, true, "something"];
console.log(fact);
console.log(fact[2]);
console.log(fact.length - 1);
console.log(fact[fact.length - 1]);
*/

// const factObj = {
//   text: "Phú Yên có thành phố là Tuy Hòa!",
//   nam_thanh_lap: 2003,
//   so_dan: 200,
//   tinh_taon_1: 10,
// };

// const factObj2 = {
//   text: "Huyện Phú Hòa",
//   tinh_taon_2: 30,
// };

// console.log(factObj.tinh_taon_1 + factObj2.tinh_taon_2);

// FOREACH
// const CATEGORIES = [
//   { name: "technology", color: "#3b82f6" },
//   { name: "science", color: "#16a34a" },
//   { name: "finance", color: "#ef4444" },
//   { name: "society", color: "#eab308" },
//   { name: "entertainment", color: "#db2777" },
//   { name: "health", color: "#14b8a6" },
//   { name: "history", color: "#f97316" },
//   { name: "news", color: "#8b5cf6" },
// ];

// const result = CATEGORIES.map((el) => {
//   return el.color;
// });

// console.log(result);
