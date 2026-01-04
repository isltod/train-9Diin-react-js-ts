// if에 대해서는 비교 연산자를 ===를 쓴다는 정도...
const name = "울프"
if (name === "울프") console.log("Ahoo~~~~")

// 이건 브라우저에서 사용할 때...window 객체에 속한....
// let drink = prompt("원하는 음료수를 입력하세요", "")
// node.js에서는...
// const readline = require('readline');
// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// reader.question('원하는 음료수를 입력하세요: ', (drink) => {
//     switch (drink) {
//         case "콜라":
//             console.log("1,000원 입니다")
//             break;
//         case "사이다":
//             console.log("2,000원 입니다")
//             break;
//         case "커피":
//             console.log("3,000원 입니다")
//             break;
//         default:
//             console.log("없습니다.");
//             break;
//     }
//     reader.close();
// });

// 기본 for 문
console.log("기본형 for------------")
for (let i = 0; i < 10; i++) {
    console.log(i)
}
// for of는 배열과 문자열 등 iterable에 대해서 - 근데 이게 동적 참조라 돌면서 원본을 잘못 건드리면 무한루프가 될 수 있다고...
console.log("for of 문자열 반복--------")
for (let char of name) {
    console.log(char)
}
// for in은 객체에 대해서 - .keys 같은 건 없다...
console.log("for in 객체 반복-----------")
const obj = {x: 1, y: 2, z: 3}
for (let key in obj) {
    console.log(key + ": " + obj[key])
}
// 또는 entries로 다 받기
console.log("entries 반복------------")
for (let [key, value] of Object.entries(obj)) {
    console.log(key + ": " + value)
}
// for of를 사용하려면 Object.keys() 또는 Object.values() 를 이용해 iterable 받아서 처리
console.log("keys() 반복-------------")
for (let key of Object.keys(obj)) {
    console.log(key + ": " + obj[key])
}
// 근데 iterable에 in은 안되나? 안된다! 뭔가 세 번 돌긴 하는데, 값이 이상하다...
console.log("iterable에 in--------------------")
console.log(Object.keys(obj))
for (let key in Object.keys(obj)) {
    console.log(key + ": " + key)
}