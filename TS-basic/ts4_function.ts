// 함수 매개변수는 기본적으로 필수,
// ?를 붙이면 선택이 되는데, 안 주면 undefined가 된다...
function fn1(param1: string, param2?: string) {
    console.log(`fn1: ${param1} ${param2}`);
}
fn1("1st")
// 선택 매개변수는 마지막에..안 그러면 빨간줄
function fn2(param1?: string, param2: string) {
    console.log(`fn2: ${param1} ${param2}`);
}
// 근데 웃기게도 그냥 실행하면 실행이 되고, 필수 여부와 상관없이 앞에서부터 매개변수를 먹인다...
fn2("2nd")

// spread 연산자를 이용한 나머지 매개변수...타입은 배열로 선언해야 한다...근데 안그래도 실행은 잘 된다...
function fn3(param1: string, ...param2: string[]) {
    console.log(`fn3: ${param1} ${param2}`);
}
// 이렇게 안주면 빈 배열로 처리된다고...
fn3("1st")
fn3("1st", "2nd", "3rd")

// 함수의 반환 타입은 시그니처 뒤에 쓴다...앞이 아니다!
function fn4(param1: string, ...param2: string[]) : string {
    return `fn4: ${param1} ${param2}`;
}
console.log(fn4("1st", "2nd", "3rd"));
// 화살표 함수도 동일
const fn5 = (param1: string, ...param2: string[]) : string => {
    return `fn5: ${param1} ${param2}`;
}
console.log(fn5("1st", "2nd", "3rd"));

const arr1 = ["one", "two", "three"];
function getAt(index: number) {
    return arr1[index];
}
// 여기서 index는 받는 것이 아니다...그냥 getAt만 쓰면 잘 보였을텐데...괜히 매개변수 반환 타입을 넣어줘서 헷갈린다...
function fn6(getAt: (index: number) => string) {
    // 받는 것은 getAt 함수를 받고, index는 아래 for에서 i로 만들어 getAt에 넣어주는 거다...
    for (let i=0; i< arr1.length; i++) {
        console.log(getAt(i));
    }
}
fn6(getAt)
// 이렇게 바닐라 자바스크립트? 문법으로 보면 오히려 명확한데...타입스크립트 문법으로 위처럼 보면 헷갈릴 수 밖에...
function fn7(getAt) {
    for (let i=0; i< arr1.length; i++) {
        console.log(getAt(i));
    }
}
fn7(getAt)

// 또 하나 타입 때문에 헷갈리는 문법으로 함수 괄호에 따라 배정이 달라지는데...
// 요건 fn81이 함수인데, string or undefined를 반환한다...의미
let fn81 : () => string | undefined;
// (fn81 : () =>) (string | undefined)
// 요건 fn82는 함수 or undefined 의미...그 때 함수면 string을 반환....
let fn82 : (() => string) | undefined;

// 일단 함수 별칭은 이렇게 하는데...
type funcType = (input: string) => void;
let fn9 : funcType
// void는 undefined와는 다르다...문제는 타입이 void 반환으로 정해도 그냥 막 덮어쓰면 되네....
fn9 = (input: string) => {
    console.log(`fn9: ${input}`);
    return input;
};
console.log(fn9("1st"));
// 아예 void로 하면...그나마 빨간줄은 가지만 여전히 잘 실행된다...
function fn10(input: string) : void {
    console.log(`fn10: ${input}`);
    return input
}
console.log(fn10("1st"));

// never 반환타입은 오류를 던질때만 사용하나?
function fail(message: string): never {
    throw new Error(message);
}

function fn11(param: unknown) {
    if (typeof (param) === "string") {
        console.log(`fn11: ${param.toUpperCase()}`);
    }
    fail("fn11에서 오류 발생...");
}
console.log(fn11("1st"));
// 이렇게 하면 오류를 낸다...
console.log(fn11(123));