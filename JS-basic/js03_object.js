// 객체가 어떻게 생겼나 한 번 보자...
// 이 세 개는 같네...
const braceObj = {}
console.log("braceObj: ", braceObj)
const protoObj = Object.create(Object.prototype)
console.log("protoObj: ", protoObj)
const newObj = new Object()
console.log("newObj: ", newObj)
// 얘만 다른데...속성은 들어가나? 들어가는데 뭔가 상속 받은게 없는 null prototype이라고 나오네...
const nullObj = Object.create(null)
console.log("nullObj: ", nullObj)
nullObj["name"] = "nullName"
console.log("nullObj: ", nullObj)

// 상속은 create로...
const parentObj = {x: 10}
const sonObj = Object.create(parentObj)
sonObj.y = 20
const grandSonObj = Object.create(sonObj)
grandSonObj.z = 30
// 근데 어설프게도 직접 보이지는 않는다..
console.log("grandSonObj: ", grandSonObj)
// 그런데도 접근은 된다...
console.log("grandSonObj.x: ", grandSonObj.x)
console.log("grandSonObj.y: ", grandSonObj.y)
// 이건 속성 검색이라는 것을 통해서, 자기한테 없으면 그 위 계열을 뒤지기 때문이라고...

// 상속된 속성은 기본이 읽기 전용이고, 덮어쓰지 못한다...
const roprObj = {}
Object.defineProperties(roprObj, {
    name: {
        writable: true,
    },
    age: {
        value: 30,
        writable: true,
    },
    gender: {
        value: "male",
    }
})
roprObj.name = "wolf"
roprObj.age = 40
roprObj.gender = "female"
// 값을 넣었지만, 자체 속성은 처음 만든 {}
console.log("roprObj: ", roprObj)
// 요건 새 값
console.log("roprObj: ", roprObj.name)
// 요건 대체
console.log("roprObj.age: ", roprObj.age)
// 이건 안 먹음...
console.log("roprObj.gender: ", roprObj.gender)

// 객체가 있다면 없는 속성을 불러도 오류가 아닌데, undefined 내고 통과
const prop1 = nullObj.prop
console.log("prop1: ", prop1)
// 상위 객체가 없으면 오류 발생...더 이상 코드 진행이 안된다...
// const prop2 = nullObj.prop.length
// console.log("prop2: ", prop2)

// 객체 속성 복사는...
const obj1 = {x: 1, y: 2}
const obj2 = {name: "wolf", age: 30}
// 이렇게 하면 obj1은 안 변해서 다시 쓸 수 있는데,
const cp2Obj = Object.assign({}, obj1, obj2)
const cp3Obj = {...obj1, ...obj2}
console.log("obj1: ", obj1)
// 이렇게 하면 모르는 사이에 obj1이 바뀌어서 다시 쓸 때 오류내기 십상이구만...
const cp1Obj = Object.assign(obj1, obj2)
console.log("cp1Obj: ", cp1Obj)
console.log("cp2Obj: ", cp2Obj)
console.log("cp3Obj: ", cp3Obj)
console.log("obj1: ", obj1)

// 직렬화라는 것...잘 되는데, Nan, Infinity가 다 null이 되서 뭉개진다...
const serialObj = {
    name: "wolf",
    age: 30,
    gender: true,
    props: {
        address: "Suwon",
        income: NaN,
        dream: Infinity,
    }
}
const strObj = JSON.stringify(serialObj)
console.log("strObj: ", strObj)
const recObj = JSON.parse(strObj)
console.log("recObj: ", recObj)