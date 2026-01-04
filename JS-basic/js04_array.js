// 자바스크립트 배열은 배열이라기 보다는 파이썬의 리스트에 가깝네...
// 거기다 sparse 배열이라는 것이 있다는데... 2 empty item 처럼 묶여서 빈 아이템이라고 보고되고, undefined 처리...
const a1 = [, , 1, , 3]
console.log(a1)
console.log(a1[0])

// 배열 생성방법은...5가지 리터럴 / spread 연산자 / new / of / from
// 1. 리터럴 - 위의 예
// 2. spread 연산자
const a2 = [...a1, "I'm a2"]
console.log(a2)
// 3. 생성자 - 아래는 배열 안에 두 배열이 들어있는 2차원 형태가 되네...
const a3 = new Array(a1, a2)
console.log(a3)
// 그럼 분해 연산자를 쓰면...역시 1차원으로 flattening
const a31 = new Array(...a1, ...a2)
console.log(a31)
// 4. of 방식은 3과 비슷하지만, 길이지정 오버라이드가 없다고 할까...
// 이건 5만 들어있는 배열
const a4 = Array.of(5)
console.log(a4)
// 이건 길이가 5인 빈 배열
const a41 = new Array(5)
console.log(a41)
// 5. from 방식 - spread 연산자와 동일하다? 좀 다른거 아닌가?
const testObj = {x: 1, y: 1}
// 객체 자체는 배열로 들어가질 않나보다...빈 배열 반환
const a5 = Array.from(testObj)
console.log(a5)
// 안되네...객체는 iterable아니라 spread 연산자 자체를 못 쓴다...
// const a51 = [...testObj]
// 그런데 유사 배열에서는 결과가 동일...같다고 할 수도 있을 듯...
const a52 = Array.from("Hello")
console.log(a52)
const a53 = [..."Hello"]
console.log(a53)

