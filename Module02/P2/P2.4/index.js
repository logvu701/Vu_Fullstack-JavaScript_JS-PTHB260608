let x = 10;
console.log("Trước block:", x);
{
    let x = 20;
    console.log("Trong block:", x);
}
console.log("Sau block:", x);
const PI = 3.14;
console.log("Giá trị ban đầu của PI:", PI);
PI = 3.14159;
console.log("Giá trị mới của PI:", PI);

/* giải thích: Biến let có phạm vi trong khối lệnh {} nên việc khai báo x = 20 bên trong block không làm thay đổi giá trị x = 10 bên ngoài. 
 Biến const không thể được gán lại giá trị sau khi khởi tạo.*/
