let sum = 0;
for (let i = 1; i <= 50; i++) {
    if (i % 5 === 0) {
        continue;
    }
    console.log("Các số thỏa mãn: ", i);
    sum += i;
    if (sum > 200) {
        console.log("=> Tổng đã vượt quá 200, dừng vòng lặp!");
        break;
    }
}
console.log("Tổng các số thỏa mãn là: ", sum);
