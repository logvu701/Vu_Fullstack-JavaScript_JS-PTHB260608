let n = Number(prompt("Nhập một số nguyên để kiểm tra: "));

if (!Number.isInteger(n)) {
    console.log("Vui lòng nhập một số nguyên hợp lệ!");
} else if (n <= 1) {
    console.log(n + " Không phải số nguyên tố");
} else {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        console.log(n + " Là số nguyên tố");
    } else {
        console.log(n + " Không phải số nguyên tố");
    }
}
