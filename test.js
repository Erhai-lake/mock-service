import mock from "./dist/index.js"

// console.log(mock.generateData('{{$lorem.hitokoto}}'))

console.log(mock.getMethodProcessorGroups("string", "uuid"))

mock.setLocale("en-US")

console.log(mock.getMethodProcessorGroups("string", "uuid"))
