// 일단 type과 interface 선언은 헷갈리게 비슷하지만 = 하나 다르다...
type t1 = {
    name: string,
    age: number
}
interface i1 {
    name: string,
    age: number
}
// 아무튼 interface가 더 빠르고, 오류 추적에 좋고, 기능이 더 많아서 좋으니 그걸 쓰라고...

// readonly 속성 - type과 차이 없고, 빨간줄은 가지만 막 실행됨...
type t2 = {
    name: string,
    readonly age: number
}
let tvar1 : t2 = {
    name: "wolf",
    age: 1
}
tvar1.age += 10
console.log(tvar1);
interface i2 {
    name: string,
    readonly age: number
}
let ivar1 : i2 = {
    name: "wolf",
    age: 1
}
ivar1.age += 10;
console.log(ivar1);

// 함수를 속성이나 메서드로 선언하는 방법...readonly 다 붙일 수 있고, method 방식에는 안된다고 뜨긴 하지만 실행된다...
type t3 = {
    readonly property: () => "",
    readonly method(): string
}
interface i3 {
    readonly property: () => "",
    readonly method(): string
}
let tvar2 : t3 = {}
let ivar2 : i3 = {}
console.log(tvar2, ivar2);

// 확장이라는 개념...상속과 같은 extends를 사용한다...
// 처음으로 type은 안되는 특징이 나왔다...이건 안된다..
// type t4 extends t3 = { gender: boolean,}
interface i4 extends i2 {
    gender: boolean | string
}
// 근데 readonly는 무시된다...빨간줄도 안가는데...아마 readonly가 final인가보다...
let ivar4 : i4 = {
    name: "wolf",
    age: 50,
    gender: true
}
console.log(ivar4);

// 다중 인터페이스로 확장...
// type t5 = {name: string}
// type t6 = {age: number}
// type t7 extends t5, t6 = {gender: true}
interface i7 {name: string}
interface i8 {age: number}
interface i9 extends i7, i8 {gender: boolean}
let ivar10: i9 = {
    name: "wolf",
    age: 17,
    gender: true
}
console.log(ivar10);

// 재정의...이건 오버로딩 같은데...
interface i5 extends i4 { gender: string }
// 단...원래 것에 아예 없던 타입을 지정하면 빨간줄이 간다..그래도 되겠지 뭐..
interface i6 extends i4 { gender: number }

// 인터페이스 병합...결국 이름 같은게 있으면 하나로 합쳐준다는 얘기인듯...
// 위에 t2, i2가 이미 있는 상황에서 같은 이름으로 다시 선언하면...
type t2 = {gender: boolean}
let tvar3 : t3 = {
    name: "wolf",
    age: 33,
    gender: true
}
console.log(tvar3);
// 둘 다 실행은 되는데, 아래는 빨간줄이 아예 없는데, 위는 빨간줄이 뒤죽박죽 생긴다...
interface i2 {
    gender: boolean | string
}
let ivar7 : i2 = {
    name: "wolf",
    age: 33,
    gender: true
}

