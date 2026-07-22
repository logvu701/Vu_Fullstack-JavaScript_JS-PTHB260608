console.log(message);
var message = "Hello";
console.log(message);

function testScope() {
    let name = "Vũ";
    console.log("Bên trong hàm:", name);
}

testScope();
console.log("Bên ngoài hàm:", name);
//Hoisting là cơ chế của JavaScript đưa phần khai báo biến var lên đầu phạm vi trước khi chương trình thực thi.
