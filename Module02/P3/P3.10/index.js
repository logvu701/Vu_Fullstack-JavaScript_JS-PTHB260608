let soBimMat = Math.floor(Math.random() * 100) + 1;
let soLanDoanToiDa = 5;
let chienThang = false;

console.log("🎮 GAME ĐOÁN SỐ BẮT ĐẦU!");
console.log("Máy tính đã giấu một số từ 1 đến 100. Bạn có 5 cơ hội.");

for (let i = 1; i <= soLanDoanToiDa; i++) {
    let doan = Number(prompt("Lần đoán thứ " + i + "/5. Mời bạn nhập số: "));

    if (!Number.isInteger(doan)) {
        console.log("Lần " + i + ": Lỗi! Vui lòng chỉ nhập số nguyên.");
        continue;
    }

    if (doan === soBimMat) {
        console.log("CHÚC MỪNG! Bạn đã đoán đúng số " + soBimMat + " chỉ sau " + i + " lần.");
        chienThang = true;
        break;
    } else if (doan > soBimMat) {
        console.log("Lần " + i + " (Bạn đoán " + doan + "): Số bạn đoán quá LỚN.");
    } else {
        console.log("Lần " + i + " (Bạn đoán " + doan + "): Số bạn đoán quá NHỎ.");
    }
}

if (!chienThang) {
    console.log("💀 GAME OVER! Bạn đã hết lượt. Số bí mật là: " + soBimMat);
}
