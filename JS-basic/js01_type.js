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


// 심볼 타입이란 건...뭔가 Symbol로 감싼 객체 같은거 같은데...즉 참조 같은걸 의미하는 듯...
const sym1 = Symbol("testStr")
console.log(sym1)
console.log(sym1.toString())
console.log(typeof sym1)
const sym2 = Symbol(123456)
console.log(sym2)
console.log(sym2.toString())

// 이걸 객체 키로 사용할 수 있고, 이 경우 통상의 key에는 안잡힌다...
user[sym1] = "test strings..."
console.log(user[sym1])
console.log(Object.keys(user))
// 근데 또 신기하게 . 문법을 사용하면 키에 잡힌다...
user.sym1 = "test strings..."
console.log(user.sym1)
console.log(Object.keys(user))

// 이미 생성된 참조를 다시 얻어오려면 for, 그 키를 얻어오려면 keyFor 메서드를 사용한다...
const sym3 = Symbol.for("testStr")
console.log(sym3)
console.log(Symbol.keyFor(sym3))

// 배열은 인덱스에서 length를 그냥 쓸 수 있다는 정도...인줄 알았는데, 그건 안되는 문법인데?
const animals = ["호랑이", "사자", "코끼리", "원숭이", "악어"]
console.log(animals[animals.length - 1]);

// Object 생성자, 사용자정의 생성자, 리터럴 생성자를 이용하면 다 객체를 만들지만,
// 이 중 사용자 정의 생성자만 타입 이름이 생긴다...
const member1 = new Object()
member1.name = "울프"
member1.address = "수원시"
console.log(member1)
function Member(name, address) {
    this.name = name;
    this.address = address;
}
const member2 = new Member("울프", "수원시")
console.log(member2)
console.log(user)
