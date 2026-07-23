let number;
do {
    number = Number(prompt("Nhập một số trong khoảng từ 1 đến 10"));
} while (number < 1 || number > 10 || !Number.isFinite(number));
console.log("Số hợp lệ là:", number);
