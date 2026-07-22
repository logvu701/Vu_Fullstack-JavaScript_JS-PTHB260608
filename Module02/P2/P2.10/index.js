let a = Number(prompt("Nhập số A:"));
let b = Number(prompt("Nhập số B:"));
let operation = prompt("Nhập phép tính (+, -, *, /, %):");

let result;
if (operation === "+") {
    result = a + b;
} else if (operation === "-") {
    result = a - b;
} else if (operation === "*") {
    result = a * b;
} else if (operation === "/") {
    result = a / b;
} else if (operation === "%") {
    result = a % b;
} else {
    result = "Phép tính không hợp lệ";
}
alert(`Kết quả của ${a} ${operation} ${b} là: ${result}`);
