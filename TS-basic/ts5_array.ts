// 배열도 타입을 지정해서 사용한다는 개념은 같은데...그럼 빨간줄만 가고 실행되는건 마찬가지 아닐까?
let arr1 : string[] = ["1st"];
arr1.push('2nd');
arr1.push(3);
console.log(arr1)
// 맞다...잘 실행된다...오히려 맨 위에 초기화를 안하면 push도 안된다고 오류난다...

// 타입 선언은 괄호를 잘 지정해야 한다...헷갈린다...
let arr21: string | number[];
// 위는 문자열과 숫자들의 배열이 아니다...문자열 또는 숫자 배열이 들어간다는 얘기다...아래처럼 해야 생각대로 된다...
let arr22: (string | number)[];
let fns11: () => string[];
// 위는 문자열 배열을 반환하는 함수를 선언한거다..함수 배열은 아래처럼 선언한다...
let fns12: ((string) => string)[];

// 아무튼...다차원 배열의 선언은
const arr3 : number[][] = [
    [1, 2, 3],
    [3, 4, 5],
];
console.log(arr3);

// spread 연산자는 배열을 연결할 때 주로 사용될 듯...
// 합치면 문자열과 숫자 배열의 배열이 된다...껍질은 하나만 벗겨낸다...
const arr4 = [...arr1, ...arr3]
console.log(arr4);
function fn1(input: string, ...args: string[]) : void {
    console.log(`fn1 ${input} - ${args}`);
}
// 역시나 args 타입이 맞질 않는데도 잘 실행된다..뭔가 컴파일러 옵션을 걸어주면 이게 다 걸릴라나?
console.log(fn1("wolf", arr4))

// 배열과 튜플 차이 - 사실 없는거 아닌가? 지정 형식에 고정 크기라지만 둘 다 그저 빨간줄만 갈 뿐 다 실행된다...
// 거기다 typeof 결과도 그저 다 object다...tuple이라고 나오지도 않는데 튜플인지 어떻게 안단 말인가?
const arr5 : [string, number] = ["test", 1]
console.log(typeof arr5);
arr5.push('new value');
console.log(arr5)
let tup1 : [string, number];
tup1 = ["test", 1]
tup1.push('new value');
console.log(tup1);
tup1 = ["test", 1, true]
console.log(tup1);
tup1 = [true, "wolf", 5]
console.log(tup1);
// 타입 스크립트란 그저 따르면 좋을 규칙의 모음일 뿐, 실제로 존재하는 어떤 인터프리터 같은 것이 아니다...

// 함수 반환값의 명시적 튜플 선언
function fn2(input: string, ...args: string[]) : [string, number] {
    return [input[0], input.length]
}
const tup2 = fn2("wolf");
console.log(tup2);

// as const assertion을 붙이면 튜플이 되고 readonly가 된다는데...이것도 아니겠지...
const tup3 = ["test", 1] as const;
// 역시나 이렇게 막 넣어도 다 된다...뭐 하나 안되는게 없다...무슨 의미인가...타입스크립트가...
tup3[1] = false
tup3.push('read only?');
console.log(tup3);

// 이게 여기서 node.js 인터프리터에 뭔가 강한 옵션을 줘서 실행 안되게 한다한들...어차피 불특정 다수는 다 되는 환경 아닌가?
