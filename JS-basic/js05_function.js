// 자바스크립트는 반환 형식을 지정하지 않고 함수를 쓴다...
// 구조분해 할당이라는 개념...
const user = {name: "wolf", age: 30}
function getName({name}) {
    return  name
}
function getMail({email = "이메일이 없습니다."}) {
    return email
}
console.log(getName(user))
console.log(getMail(user))

// spread 연산자를 쓰면 배열로 묶어준다..
function addNumber(...numbers) {
    console.log("numbers: ", numbers)
    let sum = 0
    for (let number of numbers) {
        sum += number
    }
    return sum
}
console.log(addNumber(1,2,3,4,5))

// 생각해보면 콜백함수라는 것은 당연하다...왜냐하면 함수를 변수/상수로 쓰는데, 매개변수라는게 변수/상수니까...
function a(callback) {
    callback()
    return "function a"
}

function b() {
    console.log("callback function b")
}

console.log(a(b))

// 하지만 콜백함수가 작동하는 방식은 이해하기 힘들다...
function add(a, b, callback) {
    setTimeout(() => {callback(a + b)}, 1000)
}

function addCore(value) {
    console.log(value)
}

console.log(add(10, 20, addCore))
// 1. add에 10, 20, addCore가 전달
// 2. setTimeout에 10, 20, addCore가 전달되고 add 나머지 실행 - undefined
// 3. 1초 뒤 addCore에 10 + 20 = 30 전달
// 4. console.log로 30 출력
// 즉 실행의 마지막은 callback 함수이므로 이 함수에 전달되는 매개변수와 처리 방법에 집중해 봐야 이해가 된다...

// 재귀 함수는 1. 반드시 종료 조건이 있어야 한다.. 2. void는 void로, return은 return으로 연결한다...
// void 방식
let i = 0
const voidFunction = () => {
    console.log(i + 1, " 번째...")
    i += 1
    if (i < 5) {
        voidFunction()
    }
}
console.log(voidFunction())
// return 방식
const userA = {name: "A", parent: null}
const userB = {name: "B", parent: userA}
const userC = {name: "C", parent: userB}
const userD = {name: "D", parent: userC}
const returnFunction = (user) => {
    console.log(user.name)
    if (user.parent) {
        return(returnFunction(user.parent))
    }
    return user
}
console.log(returnFunction(userD))

// 콜백 시에 this 키워드가 다르게 작동한다...
const timer = {
    name: "timer",
    timeout() {
        console.log("no callback this: ", this.name)
        // 이녀석은 this를 가지고 가질 않아서 undefined -
        // 이건 전통적인 함수답게, 틀만 만들고 필요한 자료는 받아서 처리하는 식으로...
        setTimeout(function () {
            console.log("callback function this: ", this.name)
        }, 1000)
        // 그런데 이녀석은 여기 this를 물고 가서 timer가 나온다...
        // 이건 함수라기 보다는 메서드나 속성처럼...뭔가 그 위에 딸려다닌다는 느낌으로...
        setTimeout(() => {
            console.log("callback () => this: ", this.name)
        }, 1000)
    }
};
timer.timeout()