// 리터럴로 객체를 그냥 만들면 타입은 object가 되네...
const obj1 = {
    born: 1988,
    name: "Wolf",
}
console.log(typeof obj1);

// 별칭이라는 걸 이용해보면? - 그래도 마찬가지로 object
// 그럼 이건 그냥 어떤 틀을 정해놓고 사용하는 거 이외에 별다른 의미는 없는 듯...
type obj2 = {
    born: number;
    name: string;
}
const obj3: obj2 = {
    born: 1968,
    name: "Wolf",
}
console.log(typeof obj3);
// 이렇게 타입으로 정해진 것 이외에 뭘 넣으면 빨간줄은 가는데 실행은 된다...
const obj4: obj2 = {
    born: 1968,
    name: "Wolf",
    gender: true
}
console.log(obj4);

// 구조적 타이핑이 뭔지 잘 모르겠는데, 상속에서 자식은 부모에, 구현은 인터페이스에 넣을 수 있는 것과 비슷한 개념인가...
type With1stName = {
    firstName: string;
}
type With2ndName = {
    lastName: string;
}
type HasBoth = {
    firstName: string,
    lastName: string,
}
// 이렇게는 되는데, 반대로 이름 한쪽만 가진 놈은 더 구체적인 두 쪽 가진 놈에게 넣을 수 없다...
const hasBoth: HasBoth = {
    firstName: "Wolf",
    lastName: "Lee",
}
let with1stName: With1stName = hasBoth;
let with2ndName: With2ndName = hasBoth;
// 고는 하지만...빨간줄은 가도 실행은 된다...
const hasOneName: With1stName = {
    firstName: "Wolf",
}
let hasBoth2: HasBoth = hasOneName;
console.log(hasBoth2);

// 안 넣어도 되는 선택적 속성은 ?로 표시
type obj5 = {
    born?: number;
    name: string | undefined;
}
const obj51: obj5 = {
    name: undefined,
}
// 선택사항 아닌데 안 넣으면 이렇게 빨간줄은 가는데...역시 실행은 된다...도대체 빨간줄의 의미가 뭘까?
const obj52: obj5 = {
    born: 1988
}
console.log(obj51, obj52);

// 아무튼 강제는 아니라고 해도...빨간줄을 피하고 싶다면 타입을 준수해야겠지...
// OR 타입은 공통(AND) 분모만 가지고
type type11 = {
    name: string;
    age: number;
}
type type12 = {
    name: string;
    gender: boolean;
}
// Or로 지정된 타입은 공통은 꼭 있고, Or는 하나만 있어도 빨간줄은 안간다...아무튼 실행은 상관없고...
type type1Or = type11 | type12;
const obj6Or: type1Or = {
    name: "wolf",
    age: 32,
    // gender: false
}
console.log(obj6Or)
// AND로 지정된 타입은 다 있어야 빨간줄 안간다...실행은 상관없고...
type type1And = type11 & type12;
const obj6And: type1And = {
    name: "wolf",
    age: 58,
    gender: true
}
console.log(obj6And)