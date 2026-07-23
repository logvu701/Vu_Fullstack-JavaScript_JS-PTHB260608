let sum = 0;
let n = Number(prompt("Nhập số n (Hãy nhập 0 nếu bạn muốn dừng):"));
while (n !== 0) {
    sum += n;
    n = Number(prompt("Nhập số n (Hãy nhập 0 nếu bạn muốn dừng):"));
}
console.log("Tổng các số đã nhập là:", sum);
