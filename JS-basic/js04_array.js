// 자바스크립트 배열은 배열이라기 보다는 파이썬의 리스트에 가깝네...
// 거기다 sparse 배열이라는 것이 있다는데... 2 empty item 처럼 묶여서 빈 아이템이라고 보고되고, undefined 처리...
const a1 = [, , 1, , 3]
console.log("a1" + a1)
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

// sparse, undefined, null, NaN 배열
// sparse 경우, 칸의 갯수보다 1 적은 길이, 마지막 칸에 값을 두면 제대로 길이...
const a61 = [,,,]
console.log("empty length: " + a61.length)
const a62 = [,1,,]
console.log("sparse length: " + a62.length)
// undefined, NaN, null은 아무 이상 없이 배열이 된다..
const a63 = [undefined, null, NaN]
console.log(a63)
console.log("undefined length: " + a63.length)

// 길이를 억지로 정하면 그렇게 잘린다
console.log("a53: " + a53)
a53.length = 3
console.log("a53.length = 3: " + a53)

// for 반복
let result = ""
for (let [index, value] of a2.entries()) {
    result += `${index}-${value},`
}
console.log(result)

// 다르게 forEach 메서드로 반복
// - 2차원 배열에는 index가 작동 안한다...
// - 단순 sparse는 빈 값을 잘 건너 뛰지만 복잡해지면 잘 작동하지 않는다...
// - 근데 여기는 break가 없다...
result = ""
a62.forEach((value, index) => {
    result += index + "-" + value + ","
})
console.log(a62)
console.log(result)

// 배열 요소 지우기 - Nan, null, undefined 모두 아닌 empty item으로 표시됨...
delete a63[1]
console.log(a63)

// map과 forEach 차이...map은 자체로 return, forEach는 안에서 처리 해줘야....
let numbers = [1,2,3,4,5,6]
const numForEach = []
numbers.forEach((value, index) => numForEach[index] = value * value)
console.log(numForEach)
const numMap = numbers.map((value) => value * value)
console.log(numMap)

// filter
const numFilter = numbers.filter((value,index) => index % 2 === 0 )
console.log(numFilter)

// find - 값, findIndex - 그 값의 인덱스, 못 찾으면 undefined / -1
const index1 = a52.findIndex((value) => value === "l" )
console.log(index1)
const char1 = a52.find((value) => value === "l" )
console.log(char1)

// every - 모든 요소가 만족, some - 하나라도 만족, true or false
if (numbers.every((value) => value < 10)) { console.log('every value is less than 10') }
if (numbers.some((value) => value > 3)) {console.log('some value is greater than 3') }

// reduce, right
const strReduce = a52.reduce((accumValue, currentValue) => {
    console.log("accumValue: ", accumValue)
    console.log("currentValue: ", currentValue)
    return accumValue + currentValue
}, "")
console.log(strReduce)
const strReduceRight = a52.reduceRight((accumValue, currentValue) => {
    console.log("accumValue: ", accumValue)
    console.log("currentValue: ", currentValue)
    return accumValue + currentValue
}, "")
console.log(strReduceRight)

// concat은 이름과는 다르게 문자열로 만드는 건 아니고 그냥 배열을 붙여준다...한 껍질은 벗긴다...
const concatNumbers = numbers.concat(1, [2, [3, 4]])
console.log(concatNumbers)

// push, pop은 뒤에서, shift, unshift는 앞에서, 덩어리면 그 덩어리 채로...
const popLast = concatNumbers.pop()
console.log(popLast)