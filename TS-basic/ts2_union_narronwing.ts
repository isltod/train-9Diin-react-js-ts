// union 타입
let var1: string | number;
// 이러면 string이나 number를 다 넣을 수는 있는데...
// 문제는...아래처럼 string과 number 모두한테 있는 멤버만 사용 가능하다...
// console.log(var3.toUppperCase())
var1 = "wolf";
// 하지만 일단 string을 넣으면 string 멤버를 사용할 수 있다..
console.log(var1.toUpperCase());
// 이렇게 값을 넣어서 타입을 한정시키는 것을 narrowing의 일종이다...
var1 = 3.2
console.log(var1.toPrecision(1))

// narrowing - 다른 방식으로...
let var2: string | number;
if (typeof var2 == "string") {
    console.log(var2.toUpperCase());
} else {
    // 근데 값을 안주고 돌리니 여기서 오류가 나네? 값을 주면 값에 따라 아닌 타입은 빨갛게 표시되는데...
    // console.log(var2.toPrecision(1));
}
// 조건문 밖에서는 여전히 오류가 난다...
// console.log(var4.toUpperCase());
// console.log(var4.toPrecision(1));
// 또한 조건문에 아예 타입이 아니라면
if (var2 == "wolf") {
    console.log(var2.toUpperCase());
} else {
    // 오류가 된다...wolf는 아니지만 fox일 수 있잖아...
    // console.log(var4.toPrecision(1));
}

// 리터럴 타입은 글자 그대로 타입이 되는 건가보다...아닌데? string인데?
const c1 = "wolf";
console.log(typeof c1)
// 타입 지정은 한편으론 값 옵션 지정처럼 작동하네...
let var3: number | "one" | "two" | "three";
var3 = 13;
var3 = "one";
// 이건 안된다...옵션에 없으니까...
// var3 = "four";

// 값이 초기화가 안되면 타입을 지정해도 undefined로 취급한다...
let var4: string;
// 근데 이건 여기서는 문제 없고 실행시에 오류가 나네...이거 인텔리제이 문제인가?
// console.log(var4.length);