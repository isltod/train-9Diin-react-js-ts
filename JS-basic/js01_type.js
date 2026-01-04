// 보통 변수를 선언할 때도 초깃값을 할당하는 것이 좋은 습관이라는데,
// 추가해서 상수는 값을 바꿀 수 없으니 선언할 때 반드시 초기화, 안하면 그 자체로 에러
const name = "wolf";
console.log(name)

// 하지만 객체는 const라도 속성 값을 바꿀 수 있다...
const user = {name: "wolf", age: 32};
user.name = "fox";
console.log(user)

// 배열도 객체처럼, const 선언에도 변경이 가능하다...
const numbers = [1, 2, 3, 4, 5];
numbers.splice(2, 1)
numbers.push(6)
console.log(numbers)

// 타입을 알고 싶으면 typeof
let num = 5;
console.log(typeof num)
// number와 undefined가 섞이면 NaN이 되는데, 타입은 number다...
console.log(num + undefined)
console.log(typeof NaN)
// 원래 undefined는 타입이 undefined인데, 숫자랑 섞이면 타입이 number가 된다...
console.log(typeof undefined)
console.log(typeof (num + undefined))


// 문자열 관련해서는 백틱 ` 사이에 ${} 사용만 알아도 될 듯...이걸 interpolation이라고...
const str1 = "Hello"
const str2 = "World"
console.log(`${str1} ${str2}`)

// null은 명시적으로 값을 비울 때, 프로그램 수준의 의도된(혹은 실수?) 빈값,
let val1 = null
console.log(val1)
// 반면에 undefined는 초기화가 안된, 시스템 수준의 거의 예외인 상황의 빈값
let val2;
console.log(val2)
// 또는 객체 속성 참조 오류 같은...
console.log(user.email)

