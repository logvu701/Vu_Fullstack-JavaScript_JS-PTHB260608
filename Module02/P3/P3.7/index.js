let luong = Number(prompt("Nhập lương:"));
let tuoi = Number(prompt("Nhập tuổi:"));
let noXau = prompt("Bạn có nợ xấu không? (Yes/No): ").trim().toLowerCase();
if (luong > 15 && tuoi >= 18 && tuoi <= 60 && noXau === "no") {
    console.log("Chúc mừng! Hồ sơ của bạn đủ điều kiện vay vốn.");
} else {
    console.log("Rất tiếc! Hồ sơ của bạn chưa đáp ứng đủ điều kiện vay vốn.");
}
