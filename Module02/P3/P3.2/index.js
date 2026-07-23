let n = Number(prompt("Nhập số n:"));
if (Number.isInteger(n) && n > 0) {
    console.log("n là số nguyên dương");
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
} else {
    console.log("n không phải là số nguyên dương");
}
