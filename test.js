import mock from "./dist/index.js"

console.log(mock.generateData('{{$number.hexadecimal}}'))
console.log(mock.getMethod("number", "hexadecimal"))
